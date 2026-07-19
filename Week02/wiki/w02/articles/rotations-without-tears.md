# Rotations Without Tears

Rotation is stored differently than you'd guess, and knowing *of* this fact (not the math, just the fact) will save you real confusion.

The human-friendly version is **Euler angles**: three numbers, degrees around X, Y, and Z. That's what the inspector shows you, that's what you type, and for everything in this course, that's what you'll use.

Under the hood, though, every engine actually stores rotation as a **quaternion**: four numbers with no visual intuition whatsoever, and the reason is a failure mode called **gimbal lock**, which is not trivia. Stack three rotation axes and there are orientations where two of them line up and you lose a degree of freedom: pitch a camera straight up and suddenly yaw and roll are the same motion, and there are directions you simply cannot turn from there without backing out first. The name comes from real gyroscope gimbals (Apollo 11's navigation computer had a warning light for it), and you can reproduce it today with a free-look camera and thirty seconds of effort. The struggle is real; quaternions exist because four numbers dodge it entirely.

## The policy

Your working policy, this week and probably for years: **read and write Euler angles, let the engine keep quaternions, and never edit a quaternion's four numbers by hand.** When code needs to combine rotations, use the engine's rotation functions rather than adding angle numbers together; rotations compose by multiplication, not addition, and the engine's functions know that even when we forget.

That's the entire quaternion section. You're welcome, and possibly for the second week in a row.

*The mathematical why lives in the going-deeper link in [[check-yourself|Check Yourself]].*
