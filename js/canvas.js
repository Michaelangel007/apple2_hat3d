/*
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 * http://tutorials.jenkov.com/html5-canvas/pixels.html
 */

// Version 2

// Framebuffer
    var canvas;
    var canvas_context;
    var canvas_image;
    var canvas_data;
    var canvas_w;
    var canvas_h;
    var canvas_sx = 10;
    var canvas_sy = 10;


    // ========================================================================
    function canvas_put()
    {
        canvas_context.putImageData( canvas_image, 0, 0 );
    }
    // ========================================================================
    function canvas_clear()
    {
        canvas_context.clearRect( 0, 0, canvas.width, canvas.height );
    }
    // ========================================================================
    function canvas_get()
    {
        canvas_image = canvas_context.getImageData(0,0,canvas_w,canvas_h);
        canvas_data  = canvas_image.data;
    }

// Pixel
    /**
     * {Number}           x
     * {Number}           y
     * {Number|Array}     r
     * {Number|Undefined} g
     * {Number|Undefined} b
     * {Number|Undefined} a
     * Note:
     *   a = 0   transparent
     *   a = 255 opaque
     * Example:
     *   putpixel( 1, 2, 255, 0, 0, 255 );
     *   putpixel( 3, 4, [255, 0, 0, 255] );
     */
    // ========================================================================
    function putpixel( x, y, r,g,b,a)
    {
        var i = ((y * canvas_image.width) + x) * 4;
        // r is array [r,g,b,a]
        if ((typeof r === 'object') && Array.isArray( r ))
        {
            var t = r;
            r = t[0];
            g = t[1];
            b = t[2];
            a = t[3];
        }
        // else: 'number'

        canvas_data[i+0] = r;
        canvas_data[i+1] = g;
        canvas_data[i+2] = b;
        canvas_data[i+3] = a;
    }

    // ========================================================================
    function addpixel( x, y, r,g,b,a)
    {
        var i = ((y * canvas_image.width) + x) * 4;
        // r is array [r,g,b,a]
        if ((typeof r === 'object') && Array.isArray( r ))
        {
            var t = r;
            r = t[0];
            g = t[1];
            b = t[2];
            a = t[3];
        }
        // else: 'number'

        canvas_data[i+0] += r;
        canvas_data[i+1] += g;
        canvas_data[i+2] += b;
        canvas_data[i+3] += a;
    }

    // ========================================================================
    function subpixel( x, y, r,g,b,a)
    {
        var i = ((y * canvas_image.width) + x) * 4;
        // r is array [r,g,b,a]
        if ((typeof r === 'object') && Array.isArray( r ))
        {
            var t = r;
            r = t[0];
            g = t[1];
            b = t[2];
            a = t[3];
        }
        // else: 'number'

        canvas_data[i+0] -= r;
        canvas_data[i+1] -= g;
        canvas_data[i+2] -= b;
        canvas_data[i+3] -= a;
    }

    // ========================================================================
    function mulpixel( x, y, r,g,b,a)
    {
        // var v = h - y; // put origin at bottom-left instead of top-left
        var i = ((y * canvas_image.width) + x) * 4;
        // r is array [r,g,b,a]
        if ((typeof r === 'object') && Array.isArray( r ))
        {
            var t = r;
            r = t[0];
            g = t[1];
            b = t[2];
            a = t[3];
        }
        // else: 'number'

        canvas_data[i+0] *= r / 255;
        canvas_data[i+1] *= g / 255;
        canvas_data[i+2] *= b / 255;
        canvas_data[i+3] *= a / 255;
    }

    // ========================================================================
    function zoompixel( x, y, op, color )
    {
        var i, j;
        var u = sx-1;
        var v = sy-1;
        for( j = 0; j < v; j++ )
        {
            for( i = 0 ; i < u; i++ )
            {
                op( x*canvas_sx + i +  1, y*canvas_sy + j + 1, color ); // +1,+1 for grid border
            }
        }
    }

// Primitives

    // ========================================================================
    function canvas_vline( x, y1, y2, color )
    {
        if( y1 === undefined ) y1 = 0;
        if( y2 === undefined ) y2 = canvas_h;

        var y;
        for( y = y1; y < y2; y++ )
            putpixel( x, y, color );
    }

    // ========================================================================
    function canvas_hline( y, x1, x2, color )
    {
        if( x1 === undefined ) x1 = 0;
        if( x2 === undefined ) x2 = canvas_w;

        var x;
        for( x = x1 ; x < x2; x++ )
            putpixel( x, y, color );
    }

    // ========================================================================
    function canvas_grid( color, scale_x, scale_y )
    {
        if (scale_x === undefined) scale_x = 10;
        if (scale_y === undefined) scale_y = 10;

        canvas_sx = scale_x;
        canvas_sy = scale_y;

        var u = canvas_sx-1;
        var v = canvas_sy-1;
        var x,y;
        var w = canvas_w;
        var h = canvas_h;

        for( y = 0; y < h; y += canvas_sy )
            canvas_hline( y, undefined, undefined, color );

        for( x = 0 ; x < w; x += canvas_sx )
            canvas_vline( x, undefined, undefined, color );
    }

// Init

    // ========================================================================
    function canvas_init( width, height )
    {
        canvas         = document.getElementById( 'canvas' );

        if( width  === undefined ) width  = canvas.width;
        if( height === undefined ) height = canvas.height;

        canvas_context = canvas.getContext( '2d' );
        canvas_image   = canvas_context.createImageData( width, height );
        canvas_data    = canvas_image.data;

        if( width  !== undefined ) canvas.width  = width;
        if( height !== undefined ) canvas.height = height;

        canvas_context.canvas.width  = width;
        canvas_context.canvas.height = height;
        canvas_w       = width;
        canvas_h       = height;
    }
