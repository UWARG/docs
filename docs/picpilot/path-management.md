#Path Management

Path management can be broken up into 3 sections. The straight parts, the parts where you turn, and the way you put them together. There is not much more to it than that.

## Straight Line Path Following

Straight line path following, also known as, following a line, is the most rudimentary part of any unmanned system. It is mostly a mathematical construct applied to a digital system. The mathematics will be described here, which can be easily compared to the code.

The principle is simple. Given two points, and the location of your vehicle, determine what heading it should follow. Now imagine the plane is directly on the path. The heading would follow the line exactly. Now imagine the plane is slightly off the path. What should happen is that the plane should face slightly towards the path, to minimize its _cross-track error_. Now imagine the plane is an infinite distance away. The plane should head at a heading perpendicular to the line, in order to regain distance. This is the premise of the straight line path following algorithm. As a result, a heading vector field would look as such:

![Vector Field of Straight Line Path Following](http://i.imgur.com/grZdAgf.png)

The equations that govern this behaviour are not complicated. There are only a few things required to make this calculation. Firstly, you must know the heading of the path. If you have the XY coordinates of the path endpoints, you can easily determine that through simple trigonometry. If you only have the GPS coordinates, you should use the [Haversine Formula](http://en.wikipedia.org/wiki/Haversine_formula) in order to get the XY coordinates.

Once you have the coordinates, subtracting them will give you the direction of travel (in an XY plane). Furthermore, by applying the _arctan_ function on the direction of travel, one will determine the path heading. In addition, the value should be between –PI and +PI. Thus, any 2PI corrections that need to be made can be made at this point.

Now the path error (or cross-track error) is calculated. This is calculated as:

    cos(courseAngle) * (positionY - targetWaypointY) – sin(courseAngle)*(positionX – targetWaypointX)

On a map, the _cross-track error _looks like this:

![Cross-track error](http://i.imgur.com/bDipgFI.jpg)

Using trigonometry you can easily derive the formula (as above) for cross-track error to encompass any situation.

The cross track error is then useful to determine the heading of the aircraft. Once again, using the _arctan_ function is suitable to do so:

![Straight Line Following Heading Equation](http://i.imgur.com/oXRJdsU.png)

    90 - rad2deg(courseAngle - MAX_PATH_APPROACH_ANGLE * 2/PI * atan(k_gain[PATH] * pathError))

Note, as the atan term increases, the heading approaches the _(courseAngle -__MAX_PATH_APPROACH_ANGLE)_.

Note, that the courseAngle is calculated with respect to the x-axis, on the x-y plane. In other words, a path going from West to East would have a courseAngle of 0 degrees. This would be 90 degrees in terms of a true heading. Therefore, to get the true heading, you must subtract the _courseAngle_ from 90 degrees.

## Orbit Following

Unlike straight line path following, orbit following involves following a curve of a certain radius. An orbit is depicted by a radius, a center location, and the direction of travel (clockwise or anti-clockwise).

![Orbit Following](http://i.imgur.com/VeXoxoI.png)

In order to maintain a certain radius, the Euclidean distance needs to be calculated between the center of the orbit and the plane itself. The goal of this function is to maintain this Euclidean distance constant. The Euclidean distance can be calculated as such:

    float orbitDistance = sqrt(pow(position[0] - center[0],2) + pow(position[1] - center[1],2));

This value is then used to determine the equivalent of _cross-track _error, but for an orbit. This is done very easily. The term _d_ (Euclidean distance) subtracted by the _ρ_ (desired radius) provides the relative error, which must be minimized.

![Orbit Following Heading Equation](http://i.imgur.com/uOmzAbj.png)

    90 - rad2deg(courseAngle + direction \* (PI/2 + atan(k\_gain[ORBIT] \* (orbitDistance - radius)/radius)))

This equation is actually very similar to the equation governing straight line path following. The _arctan_ function forces the heading to converge onto the orbit. The direction of travel (_λ_) which can be either _1_ or _-1_, reverses the effect of the heading perturbations. This is then added onto the course angle as a perturbation. Once again, a gain value needs to be tuned to determine the rate of convergence.

The course angle can be determined easily based on the location of the curve. For instance, if the vehicle is in the first quadrant of the circle/orbit, the heading will range between 270° and 0°, assuming a counter-clockwise rotation. This course angle can be calculated using this equation:

    float courseAngle = atan2(position[1] - center[1], position[0] - center[0]);

## Putting it all together

The orbit following and straight path following algorithms are used in combination in order to assemble a path. Both algorithms alternate in usage. Every corner uses the orbit following algorithm. Every straight line uses the straight path following algorithm.

In order to put the two together, you must draw in orbits between each set of points. The additional restriction is that they must be tangent to both lines, as depicted in this diagram:

![Path Management](http://i.imgur.com/0G5oDFa.png)

Figuring out where the tangent will touch requires some basic trigonometry. The derivation won't be explained here, however, the coordinates at which this occurs can be calculated using:

![Half Plane equation](http://i.imgur.com/VtLI024.png)

Where nextX/Y/Z refer to the coordinates of the point Wi+1 and targetX/Y/Z refer to the coordinates of the point Wi.

The turning angle can be calculated via the following equation:

    float turningAngle = acos(-deg2rad(waypointDirection[0] * nextWaypointDirection[0] + waypointDirection[1] * nextWaypointDirection[1] + waypointDirection[2] * nextWaypointDirection[2]));

This is simply the dot product of the (Wi - Wi-1) vector and the (Wi+1 - Wi) vector. Given the dot product formula, you can use the _arccos_ function to determine the angle between the two lines.

At these calculated points, there is a checkpoint. Imagine a giant plane perpendicular to the path. As soon as the plane crosses this boundary, the next step is executed. For instance, if the vehicle is travelling straight along a path, then passes the plane, it will initiate a turn (orbiting algorithm). Once it passes the next plane, it will initiate the straight line path following algorithm once again.

In order to detect if a vehicle passes the boundary, the dot product of two vectors must be taken. If the value is positive, it is an indicator that the vehicle has crossed the boundary.

The dot product is:

![Dot Product Equation](http://i.imgur.com/K8Ezrvm.png)

Both vectors have X, Y, and Z components. Likewise, equations that depict the half plane are stated above.

Note that in the code, all "direction vectors" such as Wi – Wi-1 are normalized.

For every pair of "checkpoints" the path index is incremented once they are passed. The index is used to identify the data in a linked list through the wireless communications.

## Managing Path Data

Path data is stored in a structure, which contains all necessary information for a single path (line) segment. The construct looks as follows:

    typedef struct _PathData{

        struct _PathData* next;

        struct _PathData* previous;

        long double longitude;  //TODO: Longitude and Latitude is bulky. Use cartesian 2D approximations

        long double latitude;

        float altitude;

        float radius; //Radius of turn

        char id;    //Array ID

        char index;

    } PathData;

This structure is a doubly linked list element. It links to the previous node and the next node. This makes it easy to traverse from one element to another. As a result, it is easy to add, insert, delete, and clear all waypoint nodes.

The included functions are:

    PathData* initializePathNode(void);

    unsigned int destroyPathNode(PathData* node);

    PathData* initializePathNodeAndNext(void);

    unsigned int appendPathNode(PathData* node);

    unsigned int removePathNode(unsigned int ID);

    void clearPathNodes(void);

    unsigned int insertPathNode(PathData* node, unsigned int previousID, unsigned int nextID);

These functions are all executed in the _checkAMData() _function. This function polls input over the DMA/SPI bus. When a new input is detected (via the WaypointWrapper structure), a corresponding function is executed.