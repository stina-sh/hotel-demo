SAMIHA 7 — NATIVE CAD REVIEW VARIANTS

Purpose
These files are editable review variants derived from the designer's supplied models 6,7 and 10. They are not a casting or manufacturing release. The original source files and the earlier Samiha 6 catalog remain unchanged.

Brief and dimension datum
The designer's written brief is the primary reference: total crown width 25 mm on the confirmed A–B direction, EU 62 (approximately 19.74 mm inner diameter), hollow sides/outer shell at nominal 0.2 mm and diameter 1.0 mm border beads/milgrain, retaining the filigree and setting style. A–B is world Y; the finger opening lies in X/Z. EU 62 is evaluated against radius 62/(2π)=9.86760647 mm.

File format
The downloads contain native NURBS/BREP objects in Rhino 7 archive 70 format with document units set to millimetres. They are not mesh-only 3DMs. The supplied originals had no document unit system; interpreting their numeric coordinates as millimetres follows the written brief. The models were reopened and checked in native-file readers and an independent CAD kernel. MatrixGold 3 itself was not available for a runtime test, and no MatrixGold parametric history has been recreated.

What the checks establish
- The complete crown envelope is measured, including final ornaments and beads; a loose untrimmed surface box is not used as the size datum.
- Retained ornament/settings geometry is compared with its original after the recorded rigid placement.
- New spheres are true round native geometry. Bead count and spacing changes are declared.
- Rebuilt hollow skins have sampled physical-wall checks, rather than relying on a valid-object flag.
- New structural connections have native contact witnesses and an assembly contact graph. Parts remain separately editable; this is not a final production Boolean union.
- The exact final native files, previews and original references are linked by checksums in the catalog.

Important exceptions
- Hollow construction is not a claim that every point in the ring has a uniform 0.2 mm wall. Solid joining ends and thicker intersecting/contact regions remain intentionally. Original stone seats, prongs and filigree stock are retained unless an explicit change is noted.
- Closed internal cavities need a workshop-approved drainage/venting and cleaning plan. Material strength, printing, casting, polishing allowance and final stone-seat clearances have not been certified.
- Designer 6 retains four inherited open/nonmanifold floral assemblies. Its shared-bow variant changes one localized inner cutout by up to 0.2781 mm at the widened scale. That must be reviewed before production.
- Designer 6/7 rim skins move outward by at most 0.0217 mm in X/Z before fresh 0.2 mm wall construction, to reconcile wall thickness with the EU 62 gauge.
- Designer 7's entire floral bank, settings and leaf beads receive a rigid 0.025 mm upward lift to resolve the inherited gauge point without changing their shapes. Conservative native trimmed-surface bounds support the corrected clearance.
- Offset/retrimmed components have finite geometric tolerances. The shared bow has sampled primary-wall thickness 0.19914–0.20122 mm and local boundary tolerance up to 0.00736 mm. These numbers are disclosed rather than presented as infinitely exact manufacturing geometry.

Using the previews
All displayed geometry uses one gold material, including any retained setting or stone geometry. Renders illustrate the actual CAD shapes but do not promise a finished metal/stone appearance. GLB files are derivative viewing assets; the native 3DM download is the editable geometry authority.

Reproducibility
The assembly replay package rebuilds the final geometry from the three checksum-pinned original 3DM files and supplied validated native replacement components. It verifies every reconstructed geometry hash and object UUID after reopening the output. It does not independently recompute all experimental surface offsets. The underlying construction/inspection scripts and tested scope are documented separately.

Final native review inventory
- Designer 6: 307 native BREPs; 208 exact 1 mm beads (124 bow, 84 leaf); four inherited open/nonmanifold floral assemblies
- Designer 7: 241 native BREPs; 161 exact 1 mm beads (116 bow, 45 leaf); no open/nonmanifold objects
- Designer 10: 989 native BREPs; 516 exact 1 mm beads; seven mosaic rows; no open/nonmanifold objects
- All three: 25.000 mm complete world-Y crown width. All separately modeled bow/leaf beads are replaced; retained framework faces were checked for additional bead-like spherical patches.

See each model's catalog QA section for its final counts, bead scope, dimensions and specific exceptions. A jeweller should resolve those exceptions and approve the production process before manufacture.
