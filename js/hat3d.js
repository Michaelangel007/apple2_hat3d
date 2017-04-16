"use strict";

// Original Atari Basic Source
/*

100 REM ARCHIMEDES SPIRAL
110 REM 
120 REM ANALOG MAGAZINE
130 REM 
140 GRAPHICS 8+16:SETCOLOR 2,0,0
150 XP=144:XR=4.71238905:XF=XR/XP
160 FOR ZI=-64 TO 64
170 ZT=ZI*2.25:ZS=ZT*ZT
180 XL=INT(SQR(20736-ZS)+0.5)
190 FOR XI=0-XL TO XL
200 XT=SQR(XI*XI+ZS)*XF
210 YY=(SIN(XT)+SIN(XT*3)*0.4)*56
220 X1=XI+ZI+160:Y1=90-YY+ZI
230 TRAP 250:COLOR 1:PLOT X1,Y1
240 COLOR 0:PLOT X1,Y1+1:DRAWTO X1,191
250 NEXT XI:NEXT ZI
260 GOTO 260
*/

function hat( color, isSolid )
{
    var f = 4.71238905 / 144;
    var i, z;
    var s, h;
    var u, v;
    var x, y;
    var clear = [255-color[0], 255-color[1], 255-color[2], 255];

    for( z = -64; z <= 64; z++ )
    {
        s = z*z*5.0625;
        h = (Math.sqrt( 20736-s ) + 0.5) | 0;
        for( i = -h; i <= h; i += 1 )
        {
            u = Math.sqrt( i*i + s ) * f;
            v = (Math.sin( u ) + Math.sin( u*3 ) * 0.4) * 56;
            x = i + z + 160;
            y = 90 - v + z;
            if ((x < canvas_w) && (y < canvas_h))
                putpixel( x|0, y|0, color )

            if( isSolid )
                canvas_vline( x|0, y+1|0, undefined, clear );
        }
    }
}

function main()
{
    document.body.style.overflow = 'hidden';
    canvas_init( 320, 200 );
    canvas_clear();

    onSolid();
//  onFrame();
}

function onSolid()
{
    canvas_get();

    // White on Black
    canvas_grid( [0,0,0,255], 1, 1 );
    hat( [255,255,255,255], 1 );

    // Black on White
    //hat( [0,0,0,255], 1 );

    canvas_put();
}

function onFrame()
{
    canvas_get();

    // White on Black
    canvas_grid( [0,0,0,255], 1, 1 );
    hat( [255,255,255,255], 0 );

    // Black on White
    //hat( [0,0,0,255], 0 );

    canvas_put();
}

