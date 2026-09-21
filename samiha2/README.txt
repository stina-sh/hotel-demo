EU 62 GOLD RING — CLIENT REVIEW MILESTONE 11

Open Ring_EU62_M11_Rhino7.3dm in Rhino 7 / MatrixGold based on Rhino 7.
Units: millimeters. Nominal inner circumference: 62.000 mm.
Nominal inner diameter: 19.7352 mm. Intended metal: gold; purity unspecified.
Overall bounding size: 22.235 x 17.446 x 23.082 mm (X/Y/Z).
Shank: 3.0 mm lower width, 1.25 mm lower radial thickness, smoothly rising to 1.38 mm at the upper shoulders; 0.18 mm edge easing.
Frame: 1.25 mm radial thickness. Weave wire: 0.960 mm nominal diameter.
These are CAD design dimensions, not independently measured client dimensions.

The visible model is one native, closed editable BREP solid (187 faces).
It is not a mesh conversion. A hidden construction layer contains the sizing rail.
There are 5 hidden original solid parts and 2 native sweep
center curves on Construction layers. The weave curves preserve the original
sweep shape; profile radius is 0.480 mm. They support direct curve edits and
rebuilding a sweep in Rhino. To reproduce the flat crests after rebuilding,
trim against a cylinder of radius 11.967606 mm, axis Y through the origin.
The original closed source solids are already trimmed. No MatrixGold feature tree
is present.
To edit a part, hide the finished joined-ring layer, then show the relevant
Construction layers. These intentionally overlap; do not export both the finished
ring and its construction parts together for manufacture.
A framed presentation view and a named top view are included. Use Zoom Extents
if the receiving application overrides saved views. Show construction layers
only when needed.
This file has no MatrixGold feature history; edit using Rhino surface/solid tools.
The four hidden closed planar band outlines allow changing the pointed shapes
without editing individual solid faces. These are native joined NURBS curves in
the XY plane, before extrusion and cylindrical trimming. To rebuild a band:
edit its outer/inner outline pair, form the planar region, extrude 20 mm toward +Z,
and intersect with a concentric cylindrical shell along axis Y through the origin
(inner radius 10.017606 mm; outer radius 11.267606 mm).
Apply a 0.150 mm section-edge fillet where feasible, then join with
the shank and weave. Keep the unmodified source solids until the rebuilt ring
passes Check, closed-edge checks and size verification. These curves are manual
construction aids, not an automatic MatrixGold history tree.


Geometry checks: source BREP saved/reopened; native solid validity; source/native
surface samples; Rhino 7 file reopened with the file library.
Independent mesh inspection: watertight and consistently oriented. All flagged triangle pairs were independently checked in 3D and with GEOS for coplanar cases; only shared mesh boundaries or disjoint triangles were found.
Full self-interference clearance remains unverified; basic solid validity alone
does not certify production readiness. The application
itself has not been tested here. CAD volume: 368.940 mm³.
Do not infer finished gold weight without alloy density and production allowance.

Current status: design review, not a manufacturing release.
Final reference fidelity remains under review. Independent checks of the
flagged diagnostic triangles are summarized above.
Except EU62, dimensions are estimates reconstructed from photos/video.
OffsetSrf 0.2: target surface, direction and units were not supplied; unresolved.
Apparent printing spokes and pedestal were omitted from the wearable model.
No stones were specified. Rendered yellow-gold color is illustrative.

Before casting, the jeweler/manufacturer must approve minimum sections,
connections, alloy, shrinkage and finishing allowance. In Rhino use Check,
SelBadObjects and ShowEdges (naked/non-manifold) as an application-level check.
Reference: https://docs.mcneel.com/rhino/7mac/help/en-us/commands/showedges.htm

ZIP contents: this README, the Rhino 7 3DM, and three actual-CAD preview images.
No development scripts, intermediate exports, or debug reports are included.
