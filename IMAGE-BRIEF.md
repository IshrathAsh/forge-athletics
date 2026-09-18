# Image Brief

**13 photographs.** Generate, rename, drop into `/public`, register each path.

Everything renders a designed placeholder until then: near-black, one hard raking
light, heavy grain, captioned "Photography pending". Nothing shows as a broken box.

---

## How to use this

1. Paste the **Style Preamble** into ChatGPT once, as your first message.
2. Send the subject lines one at a time, **in the same conversation**. That is what
   keeps the set consistent. A fresh chat per image gives you 13 different looks.
3. Save each under its exact filename in `/public`.
4. Add each path to `AVAILABLE_IMAGES` in [`src/lib/images.ts`](src/lib/images.ts).

Step 4 is the only code change. The aspect boxes already match, so nothing reflows.

---

## Style Preamble

Built from section 07 of the brand brief, including its four "avoid" rules.

```
I'm generating a set of 13 photographs for a single strength and conditioning
gym. They must look like one photographer shot them in one facility on one
day. Hold this exact style for every image in this conversation.

STYLE:
Raw industrial documentary. Dark gym interior, concrete and black steel.
Dramatic single-source lighting: one hard overhead or side light, deep
shadow everywhere else. High contrast, crushed blacks, no fill light.
Shot on 35mm, visible grain, slight motion blur where there is movement.

COLOUR:
Near monochrome. Black, charcoal, bone white, the dull grey of iron
plates. Desaturated almost to greyscale, with only the warmth of the
overhead light. No colour grading toward teal or orange.

SUBJECT:
Real training. Chalk dust in the air, chalk on hands and bars, loaded
barbells, worn equipment, sweat. People mid-effort, faces obscured by
angle or shadow or turned away from camera.

ABSOLUTELY AVOID:
Anyone smiling at the camera. Anyone looking at the camera at all.
Generic muscular hero poses or flexing. Bright commercial gym interiors
with big windows and light floors. Rows of cardio machines. Influencer
or fitness-magazine retouching, oiled skin, visible branding, logos on
clothing. Anything that looks like a stock photo of a gym.

Real people, real work. I'll give the aspect ratio with each subject.
Confirm you have this, then I'll send them one at a time.
```

---

## The 13

### Hero (1)

| Filename | Subject line |
|---|---|
| `hero.jpg` | **16:9 landscape.** Wide shot of a dark strength floor, one lifter standing at a loaded barbell under a single overhead light, clapping chalk from their hands so dust hangs in the beam. Seen from behind and slightly to the side, face not visible. Deep shadow filling most of the frame, especially the left third. |

> The headline sits over the left of this frame. Leave that side dark and empty.

### Training programmes (3) — 4:5 portrait

| Filename | Subject line |
|---|---|
| `program-strength.jpg` | **4:5 portrait.** Low angle on a loaded barbell mid-squat, plates in sharp focus, the lifter's torso cropped above frame. Chalk on the knurling. Hard light from the upper left. |
| `program-conditioning.jpg` | **4:5 portrait.** A figure pushing a weighted sled across turf in a dark room, shot from the side, motion blur on the legs, dust kicked up. Face turned away. |
| `program-performance.jpg` | **4:5 portrait.** An athlete caught at the top of a jump or the catch of a clean, mid-movement, blurred at the edges. Backlit so they read as a silhouette with rim light. |

### Coaches (4) — 3:4 portrait

Environmental portraits on the gym floor, not studio shots.

| Filename | Subject line |
|---|---|
| `coach-arjun.jpg` | **3:4 portrait.** A man in his late thirties chalking his hands beside a squat rack, looking down at his hands, not at the camera. Plain black t-shirt. Single hard side light. |
| `coach-nikhita.jpg` | **3:4 portrait.** A woman in her early thirties crouched beside a barbell adjusting plates, in profile, absorbed in the task. Dark athletic wear, no logos. |
| `coach-imran.jpg` | **3:4 portrait.** A man in his thirties resting forearms on an assault bike, head down, catching his breath. Face in shadow. |
| `coach-meera.jpg` | **3:4 portrait.** A woman in her late twenties on a lifting platform holding a barbell at the hip, looking off frame left. Lifting shoes, knee sleeves. |

> **Faces may be present here** but nobody looks into the lens and nobody smiles,
> per section 07. These are portraits of people working, not headshots.

### Facility (5) — 4:5 portrait

Rooms and equipment. **No people in these five.**

| Filename | Subject line |
|---|---|
| `facility-strength.jpg` | **4:5 portrait.** A row of black power racks receding down a dark hall, calibrated plates loaded on the bars, overhead lights pooling on the floor. Empty. |
| `facility-platforms.jpg` | **4:5 portrait.** An empty Olympic lifting platform with a barbell and bumper plates, chalk scattered on the wood, jerk blocks stacked behind. |
| `facility-conditioning.jpg` | **4:5 portrait.** Assault bikes and ski ergs in a line against a concrete wall, a turf lane running away from camera. Low light. |
| `facility-recovery.jpg` | **4:5 portrait.** A cold plunge tub and sauna door in a dim tiled room, steam, no people. Quiet and clinical. |
| `facility-changing.jpg` | **4:5 portrait.** A row of black metal lockers in a dark changing room, a folded towel on a bench, one overhead light. |

---

## Before you register the files

- [ ] All 13 filenames match exactly, `.jpg` included
- [ ] Ratios correct: 1 at 16:9, 8 at 4:5, 4 at 3:4
- [ ] Viewed all 13 together as a grid. If one is brighter or more saturated than the rest, regenerate it
- [ ] Nobody is smiling or looking at the camera
- [ ] No visible brand logos on clothing or equipment
- [ ] Each path added to `AVAILABLE_IMAGES`

### Order of value, if you cannot do all 13

1. **`hero.jpg`.** The single highest-impact image on the page.
2. **The 3 programme frames.** They sit in a shared hover panel, so all three are needed together or none.
3. **The 5 facility frames.** Same rule: the strip is one component and should not be half-photographed.
4. **The 4 coach portraits.** Last, and the hardest for a generator to do without producing faces that read as synthetic.

### If the set comes back uneven

There is a grading approach used on the sister project that pushes a folder through
one consistent treatment. Say the word and I will apply a matching pass here, tuned
dark rather than warm.
