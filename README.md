# Atari, er, Applesoft Hat 3D

![Hat 3D](hat3d.png)

```Basic
    0 REM Converted from ATARI "Hat"
    1 REM By Michaelangel007
    2 REM X1 -> X
    3 REM XF -> F
    4 REM XI -> I
    5 REM XL -> L
    6 REM XT -> U
    7 REM Y1 -> Y
    8 REM YY -> V
    9 REM ZS -> S
    10 REM 2.25 * 2.25 -> 5.0625
    100 REM ARCHIMEDES SPIRAL
    110 REM 
    120 REM ANALOG MAGAZINE
    130 REM 
    140 HGR:POKE 49234,0:REM $C052
    150 F=4.71238905/144
    160 FOR Z=-64 TO 64
    170   S=Z*Z*5.0625
    180   L=INT(SQR(20736-S)+0.5)
    190   FOR I=-L TO L
    200     U=SQR(I*I+S)*F
    210     V=(SIN(U)+SIN(U*3)*0.4)*56
    220     X=I+Z+160:Y=90-V+Z
    222     IF X>279 THEN GOTO 250
    224     IF Y>191 THEN GOTO 250
    230     HCOLOR=3:HPLOT X,Y
    240     HCOLOR=0:HPLOT X,Y+1 TO X,191
    250   NEXT:NEXT
```