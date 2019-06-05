***Minnows***
CMPS160 Final Project
Team: Lawrence Tam, Raymond Lee, James Egan

This is an underwater swimming simulation, with fishes. The player has a harpoon they can deploy, but if they use these on fish too often they will turn on the player and swarm them.

Part1:
Interactions:
Collision with the floor
Velocity check
Showcase Harpoon
If click, throw
Cylinder
Pause Menu

Doc: How to interact
Interaction:
Mouse: look around
WASD keys: move relative to mouse direction
Space: move up
Q: move down
Left click: first: use harpoon -> left to retract, right to pull yourself if applicable
Right click: sound burst
Collision: recoil if bumped into object
Esc: open pause menu, freeze world

Features:
Water murkiness
//Water surface has light and god rays
Generated Terrain
// Special objects generated throughout the world (shipwrecks, seaweed, coral rocks)
Minnows, with swarming mechanic
Pause Menu -- options: free roam, 
// Stamina System?

Concept Images:


Implementation Details:
Pause menu (NYI): use canvas as a 2D renderer, on top of the webGL 3D render
Terrain (NYI): Perlin noise as a heightmap
https://29a.ch/2012/7/19/webgl-terrain-rendering-water-fog
Fog (NYI): https://webglfundamentals.org/webgl/lessons/webgl-fog.html
Underwater experience (NYI): underwater shader
Player Environment Collision (NYI)
Harpoon Collision (NYI)
Harpoon affecting camera position
Ocean
https://medium.com/@gordonnl/the-ocean-170fdfd659f1
http://madebyevan.com/webgl-water/
https://29a.ch/slides/2012/webglwater/#vertex-shader
Fish (NYI)
Behavior (NYI): Boids + enhancements
Texturing (NYI): apply 2D texture to both sides

Doc: At least one picture included in your description of what you want to accomplish to show the goal.

(We are creating our take on Subnautica)

Doc: Description of each of (team members x2) advanced methods you (plan to) have implemented.
Lawrence: 	Pause menu, ocean & waves, Fish (given enough time)
Raymond: 	Harpoon & its interactions, Fog, Float up/ float down (given enough time)
James:		Collision, Terrain, Fish AI (given enough time)
