# VERIFIED CLIMATE / SITE-ANALYSIS DATA AUDIT
## Source-derived audit of the two uploaded climate files

Canonical uploaded sources:
- Complete-Climate-Site-Analysis-A-villa-red-sun.txt
- Complete-Climate-Site-Analysis-B-villa-efe.txt

## 1. Villa Red Sun — Solrød, Denmark

Coordinates:
55.516105°N, 12.208375°E

Climate:
Temperate maritime / Cfb.

### Monthly precipitation
Jan 53
Feb 36
Mar 30
Apr 28
May 58
Jun 70
Jul 65
Aug 88
Sep 49
Oct 64
Nov 69
Dec 63 mm

Listed monthly values sum to 673 mm.
The source annual total is 674 mm.
Treat the 1 mm difference as a rounding/source-table discrepancy.

### Monthly mean temperature
Jan 0.8
Feb 0.7
Mar 3.2
Apr 7.5
May 11.5
Jun 14.7
Jul 17.8
Aug 17.0
Sep 13.7
Oct 9.6
Nov 6.0
Dec 2.7 °C

Annual mean source value: 8.8°C.

### Monthly sunshine
Jan 47
Feb 62
Mar 146
Apr 215
May 241
Jun 245
Jul 252
Aug 195
Sep 160
Oct 103
Nov 46
Dec 34 h

Listed monthly values sum to 1,746 h.
The source annual total is 1,747 h.
Treat the 1 h difference as a rounding/source-table discrepancy.

### Wind
Prevailing W / WSW.
Exact-site annual/seasonal mean wind speed is not established.
Do not synthesize monthly wind speeds.

### Humidity
Exact monthly RH is not established.
Do not present precise monthly RH.

### Solar
Source:
21 June solar noon 55.3°
21 December solar noon 11.0°

Important integrity finding:
A standard solar-position calculation using the supplied coordinates and the source's stated astronomical approach gives approximately 57.9° at 21 June solar noon, while the source says 55.3°.
The source's 10:00 value (~42.4°) and 14:00 value (~56.8°) are consistent with the deterministic calculation, as is the December noon value (~11.0°).

Therefore:
- do not silently rewrite the source;
- do not silently treat 55.3° as independently verified;
- for a new digital solar calculation, use the deterministic astronomical method;
- report the source discrepancy explicitly.

## 2. Villa Efe — Girne/Kyrenia, Northern Cyprus

Coordinates:
35.3442167°N, 33.2428083°E

Climate:
Hot-summer Mediterranean.

### Monthly precipitation
Jan 117
Feb 79
Mar 60
Apr 20
May 13
Jun 2
Jul 0
Aug 0
Sep 5
Oct 37
Nov 68
Dec 133 mm

Monthly values sum exactly to 534 mm.

The source also contains a separate 506.44 mm/year value from a different Girne station/reference-period dataset.
Do not silently reconcile the two.
For a monthly visualization based on the monthly table, 534 mm is the annual total corresponding to that table; 506.44 mm remains a separate source/reference value.

### Monthly temperature
Mean high / mean low / approximate mean:
Jan 16 / 9 / 12.5
Feb 17 / 9 / 13.0
Mar 19 / 10 / 14.5
Apr 22 / 12 / 17.0
May 26 / 16 / 21.0
Jun 30 / 20 / 25.0
Jul 33 / 22 / 27.5
Aug 33 / 23 / 28.0
Sep 31 / 21 / 26.0
Oct 27 / 17 / 22.0
Nov 23 / 14 / 18.5
Dec 18 / 11 / 14.5 °C

### Wind
Prevailing W.
Official annual mean: 3.0 m/s for 1991–2020.
37.8 m/s is a recorded historical extreme, not a typical/design value.
No precise monthly wind-speed data should be synthesized.

### Humidity
The source contains a regional Athalassa monthly RH series, but explicitly warns it is not exact-site Girne RH.
For the new site-analysis diagram, do not present those values as exact-site monthly measurements.
Use qualitative seasonal information only if needed.

### Sunshine
The source includes annual solar-energy information (546.4 cal/cm²) and a regional monthly sunshine-hours table.
Do not convert solar-energy units into sunshine hours or vice versa.
Keep physical quantities distinct.

### Solar
Source solstice values:
21 June noon ≈ 78.1°
21 December noon ≈ 31.2°

Independent deterministic calculation reproduces these values closely.
These are suitable validation anchors for the new monthly solar calculation.

## 3. Implementation implications

The new digital environmental diagrams can honestly provide monthly:
- solar path / solar altitude / azimuth (deterministically calculated);
- precipitation;
- temperature.

They must NOT fabricate:
- exact monthly wind speeds;
- exact monthly Red Sun RH;
- exact monthly Villa Efe RH;
- missing site-specific engineering values.

Wind should remain an annual/seasonal qualitative regime or a static annual summary.

## 4. Visual/data integrity rule

The visualization must communicate the precision level of the data.

Monthly measured/derived data can receive precise visual encoding.
Qualitative seasonal regimes must look qualitatively different.
Missing data must remain missing.

No fake scientific visualization.
No decorative numbers.
No Stitch-generated environmental values.
