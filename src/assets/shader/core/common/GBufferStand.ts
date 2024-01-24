export let GBufferStand = /* wgsl */ `
    #include "MathShader"
    #include "FastMathShader"
    #include "PixeShaderUtil"
    #include "ColorUtil_frag"

    @group(0) @binding(1) var gBufferTexture : texture_2d<f32>;

    struct GBuffer{
        x : f32 ,
        y : f32 ,
        z : f32 ,
        w : f32 ,
    }

    struct ViewSpaceGBuffer{
        depth:f32,
        color:vec3f ,
        abldeoColor:vec3f ,
        viewPosition:vec3f,
        viewNormal:vec3f,
        roughness:f32,
        metallic:f32,
    }

    struct WorldSpaceGBuffer{
        depth:f32,
        color:vec3f ,
        abldeoColor:vec3f ,
        worldPosition:vec3f,
        worldNormal:vec3f,
        roughness:f32,
        metallic:f32,
    }

    fn getViewSpaceGBuffer(fragCoord:vec2i , uv:vec2f ) -> ViewSpaceGBuffer {
        var sampleUV = uv ;
        sampleUV.y = 1.0 - sampleUV.y ;
        let gBufferTexture = textureLoad(gBufferTexture, fragCoord , 0) ;

        var gBuffer : ViewSpaceGBuffer ;
        //x channel view space depth 
        gBuffer.depth = gBufferTexture.x ;
        let viewPos = getViewPosition(gBufferTexture.x,sampleUV);
        gBuffer.viewPosition = viewPos;
        
        //y channel last final color texture
        gBuffer.color = floatToVec3f(gBufferTexture.y) ;

        //z channel view space normal 
        let zChannel = floatToVec3f(gBufferTexture.z) ;
        let octUV = zChannel.xy * 2.0 - 1.0  ;
        gBuffer.viewNormal = octDecode(octUV.xy) ;

        //w channel view space normal 
        let wChannel = floatToVec3f(gBufferTexture.w) ;
        gBuffer.abldeoColor = wChannel.xyz ;

        gBuffer.roughness = zChannel.z ;
        gBuffer.metallic = 0.0 ;//wChannel.w ;

        return gBuffer ;
    }

    fn getWorldSpaceGBuffer(fragCoord:vec2i , uv:vec2f ) -> WorldSpaceGBuffer {
        var sampleUV = uv ;
        sampleUV.y = 1.0 - sampleUV.y ;
        let gBufferTexture = textureLoad(gBufferTexture, fragCoord , 0) ;

        var gBuffer : WorldSpaceGBuffer ;
        //x channel view space depth 
        gBuffer.depth = gBufferTexture.x ;
        let worldPos = getWorldPosition(gBufferTexture.x,sampleUV);
        gBuffer.worldPosition = worldPos;

        //y channel last final color texture
        gBuffer.color = floatToVec3f(gBufferTexture.y) ;

        //z channel world space normal and roughness 
        let zChannel = floatToVec3f(gBufferTexture.z) ;
        let octUV = zChannel.xy * 2.0 - 1.0  ;
        gBuffer.worldNormal = getWorldNormal(octDecode(octUV.xy)) ;

        //w channel abldeoColor and metallic
        let wChannel = floatToVec3f(gBufferTexture.w) ;
        gBuffer.abldeoColor = wChannel.xyz ;

        gBuffer.roughness = zChannel.z ;
        gBuffer.metallic = 0.0 ;//wChannel.w ;

        return gBuffer ;
    }

    fn getGBuffer(fragCoord:vec2i) -> GBuffer {
        let gBufferTexture = textureLoad(gBufferTexture, fragCoord , 0) ;
        var gBuffer:GBuffer ;
        gBuffer.x = gBufferTexture.x ;
        gBuffer.y = gBufferTexture.y ;
        gBuffer.z = gBufferTexture.z ;
        gBuffer.w = gBufferTexture.w ;
        return gBuffer ;
    }

    fn getDepthFromGBuffer(gBuffer:GBuffer) -> f32 {
        return gBuffer.x ;
    }

    fn getViewPositionFromGBuffer(gBuffer:GBuffer,screenUV:vec2f) -> vec3f {
        var sampleUV = screenUV ;
        sampleUV.x = 1.0 - sampleUV.x ;
        sampleUV.y = 1.0 - sampleUV.y ;
        let viewPos = getViewPosition(gBuffer.x,sampleUV);
        return viewPos;
    }

    fn getViewNormalFromGBuffer(gBuffer:GBuffer) -> vec3f {
        let zChannel = unpack4x8unorm(u32(gBuffer.y)) ;
        let octUV = zChannel.xy * 2.0 - 1.0  ;
        let worldNormal = octDecode(octUV.xy) ;
        return worldNormal;
    }

    fn getWorldPositionFromGBuffer(gBuffer:GBuffer,uv:vec2f) -> vec3f {
        var sampleUV = uv ;
        sampleUV.y = 1.0 - sampleUV.y ;
        let worldPos = getWorldPosition(gBuffer.x,sampleUV);
        return worldPos;
    }

    fn getWorldNormalFromGBuffer(gBuffer:GBuffer) -> vec3f {
        let zChannel = unpack4x8unorm(u32(gBuffer.y)) ;
        let octUV = zChannel.xy * 2.0 - 1.0  ;
        let worldNormal = octDecode(octUV.xy) * 2.0 - 1.0 ;
        return worldNormal;
    }

    fn getColorFromGBuffer(gBuffer:GBuffer) -> vec3f {
        let rgb = unpack4x8unorm(u32(gBuffer.z)).rgb ;
        let m = unpack4x8unorm(u32(gBuffer.w)).z ;
        return DecodeRGBM(vec4f(rgb,m)) ;
    }

    fn getAbldeoFromGBuffer(gBuffer:GBuffer) -> vec3f {
        let wChannel = floatToVec3f(gBuffer.w) ;
        return wChannel.xyz ;
    }

    fn getRMFromGBuffer(gBuffer:GBuffer) -> vec2f {
        let channel = unpack4x8unorm(u32(gBuffer.w)) ;
        return vec2f(channel.x,channel.y);
    }

    
`