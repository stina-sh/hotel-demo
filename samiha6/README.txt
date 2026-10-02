SAMIHA6 — PHOTO-GUIDED 3D JEWELRY RECONSTRUCTIONS

15 complete ring assemblies, design 00 through 14, reconstructed from the original supplied jewelry images. These files add curved ring bodies, three-dimensional decorative galleries, raised gold plates, joining supports and fine beaded edging. The previews are actual Blender renders of the supplied editable geometry.

WHAT IS VERIFIED
- The reference images correspond to the 15 latest sent image emails and the Samiha5 reference set.
- The source Samiha5 Rhino files contain planar half drawings. They are reference inputs, not complete 3D rings.
- Each model has a full three-dimensional band and separate named decorative components.
- Individual mesh topology, export dimensions and physical-unit handling are recorded in model-specific checks where available.

IMPORTANT LIMITS
- A single angled image cannot establish exact measurements, rear construction, alloy or manufacturing tolerances.
- 18.0 mm inner diameter is an explicit review assumption, not the user's confirmed ring size. The earlier EU62 specification belongs to a separate project and has not been applied here.
- Other dimensions, hidden shoulders, joins and gallery structures are estimated. This is a visual reconstruction rather than a scan or an exact reverse-engineered original.
- Gold is a display material. Decorative beads have not been interpreted as gemstones.
- Separate closed mesh parts intentionally overlap for editability. They are not a Boolean-fused casting master. Per-part manifold topology does not establish a single watertight manufactured article.
- A jeweler/CAD technician must confirm ring size, proportions, alloy, minimum walls, joins, clearances, finishing and casting shrinkage before production.

FILES AND UNITS
- .blend: editable Blender scene, named mesh parts, lights/camera and packed original reference image
- .glb: mesh interchange, physical dimensions expressed in metres as required by glTF
- .stl (when included): mesh review export with numerical millimetre coordinates; STL itself has no unit field
- *_mesh.3dm (when included): millimetre Rhino mesh interchange. These are meshes, NOT editable NURBS/BREP solids or MatrixGold feature-history models
- .png: actual Blender renders
- .py: reproducible procedural model sources, for Blender 4.3.2
- source/reference image: original image used for visual comparison
- geometry notes / QA reports: assumptions and automated checks, not manufacturing certification

DESIGN INDEX
00 Three ribbons / two leaf rows
01 Split ribbons / central flower
02 Sweeping ribbon / leaf borders
03 Three rounded bars / leaf shoulders
04 Open curved frame / leaf fan
05 Rounded center cluster / leaf shoulders
06 S-shaped ribbon / leaf sides
07 Broad leaf-and-round mosaic
08 Crossing ribbons / leaf edging
09 Split chevron ribbons / raised leaf crown
10 Leaf-filled wings / rounded center
11 Slim four-petal floral band
12 Shallow chevron / leaf fan
13 Radial tiered rosette
14 Asymmetric frame / leaf spray

OPENING AND EDITING
Open the .blend file in Blender. Jewelry components are separated from the studio objects. Unhide the source-reference object if needed. Source filenames retain the design number, which maps to IMG-20260928-WA00XX.jpg.

For designs 00/02/09/12, shared helper files live at the package's jewelry root. Run design00/build.py directly with Blender; run build_crown_variants.py with -- 2, -- 9 or -- 12. Preserve that folder structure when using these sources. Other model folders contain their own documented build script.

Source project: https://stina.tech/samiha5

PUBLICATION NOTE
Source filenames retain Samiha5 design numbers, matching the preceding reference set. All 15 reconstructed 3D designs are published here as the Samiha6 collection. The ZIP for each design includes Blender, GLB, Rhino 7 mesh 3DM, original reference, procedural sources, and review notes. Design 08 has looser leaf-row spacing than the source photograph.

DIRECT RHINO / MATRIXGOLD REVIEW DOWNLOADS
Each card now provides its Rhino 7 mesh .3dm directly at assets/XX/Samiha6_XX_Rhino7_review_mesh.3dm. The bytes are identical to the original .3dm in that design ZIP; only the public filename differs. These files contain Rhino mesh objects, not NURBS/BREP solids, parametric models or MatrixGold feature history. No geometry was rebuilt or converted. Native Rhino/MatrixGold application opening was not tested here. Use the optional ZIP for Blender, procedural sources and detailed notes.
