import * as THREE from 'three';

const snoise = `
// Simplex 3D Noise 
// by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const simVertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

const simFragmentShader = `
precision highp float;
uniform sampler2D uPosition;
uniform sampler2D uPosRefs;
uniform vec2 uRingPos;
uniform float uTime;
uniform float uDeltaTime;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uRingWidth2;
uniform float uRingDisplacement;
uniform float uSimSize;

${snoise}

void main() {
    // Dynamic FBO size
    vec2 simTexCoords = gl_FragCoord.xy / vec2(uSimSize, uSimSize);
    vec4 pFrame = texture2D(uPosition, simTexCoords);

    float scale = pFrame.z;
    float velocity = pFrame.w;
    vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;

    float time = uTime * .5;
    vec2 curentPos = refPos;

    vec2 pos = pFrame.xy;
    pos *= .8;

    float dist = distance(curentPos.xy, uRingPos);
    float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
    float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);

    float t = smoothstep(uRingRadius - (uRingWidth * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
    float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
    float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

    t = pow(t, 2.);
    t2 = pow(t2, 3.);

    t += t2 * 3.;
    t += t3 * .4;
    t += snoise(vec3(curentPos.xy * 30. + vec2(11.4924, 12.9744), time * 0.5)) * t3 * .5;

    float nS = snoise(vec3(curentPos.xy * 2. + vec2(18.4924, 72.9744), time * 0.5));
    t += pow((nS + 1.5) * .5, 2.) * .6;

    float noise1 = snoise(vec3(curentPos.xy * 4. + vec2(88.494, 32.4397), time * 0.35));
    float noise2 = snoise(vec3(curentPos.xy * 4. + vec2(50.904, 120.947), time * 0.35));
    float noise3 = snoise(vec3(curentPos.xy * 20. + vec2(18.4924, 72.9744), time * .5));
    float noise4 = snoise(vec3(curentPos.xy * 20. + vec2(50.904, 120.947), time * .5));

    vec2 disp = vec2(noise1, noise2) * .03;
    disp += vec2(noise3, noise4) * .005;

    disp.x += sin((refPos.x * 20.) + (time * 4.)) * .02 * clamp(dist, 0., 1.);
    disp.y += cos((refPos.y * 20.) + (time * 3.)) * .02 * clamp(dist, 0., 1.);

    // Refined ring interaction with smoother transitions and scale-based velocity
    float interactionZone = smoothstep(uRingRadius + uRingWidth, uRingRadius, dist);
    pos -= (uRingPos - (curentPos + disp)) * interactionZone * uRingDisplacement;
    
    // Improved velocity damping to prevent erratic behavior
    velocity *= 0.5;
    velocity += scale * 0.25 * (1.0 - interactionZone * 0.5);

    float scaleDiff = t - scale;
    scaleDiff *= .2;
    scale += scaleDiff;

    vec2 finalPos = curentPos + disp + (pos * .25);

    vec4 frame = vec4(finalPos, scale, velocity);
    gl_FragColor = frame;
}
`;

const renderVertexShader = `
precision highp float;
attribute vec4 seeds;

uniform sampler2D uPosition;
uniform float uTime;
uniform float uParticleScale;
uniform float uPixelRatio;
uniform int uColorScheme;

varying vec4 vSeeds;
varying float vVelocity;
varying vec2 vLocalPos;
varying vec2 vScreenPos;
varying float vScale;

void main() {
    vec4 pos = texture2D(uPosition, uv);
    vSeeds = seeds;

    vVelocity = pos.w;
    vScale = pos.z;
    vLocalPos = pos.xy;
    vec4 viewSpace  = modelViewMatrix * vec4(vec3(pos.xy, 0.), 1.0);

    gl_Position = projectionMatrix * viewSpace;
    vScreenPos = gl_Position.xy;

    gl_PointSize = ((vScale * 7.) * (uPixelRatio * 0.5) * uParticleScale);
}
`;

const renderFragmentShader = `
precision highp float;

varying vec4 vSeeds;
varying vec2 vScreenPos;
varying vec2 vLocalPos;
varying float vScale;
varying float vVelocity;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

uniform vec2 uRingPos;
uniform vec2 uRez;
uniform float uAlpha;
uniform float uTime;
uniform int uColorScheme;

${snoise}

#define PI 3.1415926535897932384626433832795

float sdRoundBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
}

void main() {
    float uBorderSize = 0.2;
    vec2 center = vec2(.48, .4);
    float ratio = uRez.x / uRez.y;

    float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * .85));
    float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * .5));
    noiseColor = (noiseColor + 1.) * .5;

    float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);

    vec2 uv = gl_PointCoord.xy;
    uv -= vec2(0.5);
    uv.y *= -1.;
    uv = rotate(uv, -angle + (noiseAngle * .5));

    vec2 tuv = vScreenPos;
    tuv = rotate(tuv, uTime * 1.);
    tuv.y *= 1./ratio;
    tuv += .5;

    float h = 0.8;
    float progress = smoothstep(0., .75, pow(noiseColor, 2.));
    vec3 col = mix(mix(uColor1, uColor2, progress/h), mix(uColor2, uColor3, (progress - h)/(1.0 - h)), step(h, progress));
    vec3 color = col;

    float dist = sqrt(dot(uv, uv));

    float dr = .5;
    float t = smoothstep(dr+(uBorderSize + .0001), dr-uBorderSize, dist);
    t = clamp(t, 0., 1.);

    // Refined particle shape logic for soft-box aesthetic
    float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(.25));
    float alphaMask = smoothstep(0.1, 0.0, rounded);
    
    float a = uAlpha * alphaMask * smoothstep(0.1, 0.2, vScale);

    if(a < 0.01){
        discard;
    }

    color = clamp(color, 0., 1.);
    color = mix(color, color * clamp(vVelocity, 0., 1.), float(uColorScheme));

    gl_FragColor = vec4(color, clamp(a * t, 0., 1.));
}
`;

export class ParticleEngine {
    private canvas: HTMLCanvasElement;
    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    private camera!: THREE.OrthographicCamera;

    private size = window.innerWidth < 768 ? 64 : window.innerWidth < 1200 ? 128 : 200; 
    private length = this.size * this.size;
    
    rt1!: THREE.WebGLRenderTarget;
    rt2!: THREE.WebGLRenderTarget;
    posTex!: THREE.DataTexture;
    
    simMaterial!: THREE.ShaderMaterial;
    simScene!: THREE.Scene;
    simCamera!: THREE.OrthographicCamera;
    
    renderMaterial!: THREE.ShaderMaterial;
    mesh!: THREE.Points;
    
    clock = new THREE.Clock();
    lastTime = 0;
    everRendered = false;
    mousePos = new THREE.Vector2(0, 0);
    ringPos = new THREE.Vector2(0, 0);
    private frameId = 0;
    private isDestroyed = false;

    constructor(private canvas: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
        });

        // Strict PixelRatio management: cap at 2 for optimal sharpness on Retina displays
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 3.5;
        this.scene = new THREE.Scene();

        this.init();
        this.setupEvents();
        this.animate();
    }

    private setupEvents() {
        const onMouseMove = (e: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            // normalized device coordinates
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            // scale it similar to antigravity intersection point (approx magic numbers)
            this.mousePos.set(nx * 1.5, ny * 1.5);
        };
        window.addEventListener('mousemove', onMouseMove);
        
        const onResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const pixelRatio = this.renderer.getPixelRatio();
            
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            
            // Update resolution uniforms during resize to prevent particle stretching
            if (this.renderMaterial) {
                this.renderMaterial.uniforms.uRez.value.set(width, height);
                this.renderMaterial.uniforms.uPixelRatio.value = pixelRatio;
                this.renderMaterial.uniforms.uParticleScale.value = (width / pixelRatio / 2000) * 1.0;
            }
        };
        window.addEventListener('resize', onResize);
    }

    private createDataTexture() {
        const data = new Float32Array(this.length * 4);
        for (let i = 0; i < this.length; i++) {
            const row = Math.floor(i / this.size);
            const col = i % this.size;
            // Revert back to the original Math.pow radial swirl
            const r = Math.random() * 2.0 * Math.PI;
            const dist = Math.pow(Math.random(), 2.0) * 1.5;
            const x = Math.cos(r) * dist;
            const y = Math.sin(r) * dist;
            data[i * 4 + 0] = x;
            data[i * 4 + 1] = y;
            data[i * 4 + 2] = 0;
            data[i * 4 + 3] = 0;
        }
        const tex = new THREE.DataTexture(data, this.size, this.size, THREE.RGBAFormat, THREE.FloatType);
        tex.needsUpdate = true;
        return tex;
    }

    private createRenderTarget() {
        return new THREE.WebGLRenderTarget(this.size, this.size, {
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            depthBuffer: false,
            stencilBuffer: false,
        });
    }

    private init() {
        this.posTex = this.createDataTexture();
        this.rt1 = this.createRenderTarget();
        this.rt2 = this.createRenderTarget();

        this.simScene = new THREE.Scene();
        this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        this.simMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPosition: { value: this.posTex },
                uPosRefs: { value: this.posTex },
                uRingPos: { value: new THREE.Vector2(0, 0) },
                uRingRadius: { value: 0.2 },
                uDeltaTime: { value: 0 },
                uRingWidth: { value: 0.05 },
                uRingWidth2: { value: 0.015 },
                uRingDisplacement: { value: 1.0 },
                uTime: { value: 0 },
                uSimSize: { value: this.size },
            },
            vertexShader: simVertexShader,
            fragmentShader: simFragmentShader,
        });
        
        const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMaterial);
        this.simScene.add(simMesh);

        const geometry = new THREE.BufferGeometry();
        const uvs = new Float32Array(this.length * 2);
        const positions = new Float32Array(this.length * 3);
        const seeds = new Float32Array(this.length * 4);

        for (let i = 0; i < this.length; i++) {
            const x = (i % this.size) / this.size;
            const y = Math.floor(i / this.size) / this.size;
            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = 0;
            uvs[i * 2] = x;
            uvs[i * 2 + 1] = y;
            seeds[i * 4] = Math.random();
            seeds[i * 4 + 1] = Math.random();
            seeds[i * 4 + 2] = Math.random();
            seeds[i * 4 + 3] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setAttribute('seeds', new THREE.BufferAttribute(seeds, 4));

        const color1 = new THREE.Color("#6200EE");
        const color2 = new THREE.Color("#FF5F00");
        const color3 = new THREE.Color("#0033FF");

        const particleScale = (window.innerWidth / this.renderer.getPixelRatio() / 2000) * 0.45;

        this.renderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPosition: { value: this.posTex },
                uTime: { value: 0 },
                uColor1: { value: color1 },
                uColor2: { value: color2 },
                uColor3: { value: color3 },
                uAlpha: { value: 1.0 },
                uRingPos: { value: new THREE.Vector2(0, 0) },
                uRez: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uParticleScale: { value: particleScale },
                uPixelRatio: { value: this.renderer.getPixelRatio() },
                uColorScheme: { value: 0 },
            },
            vertexShader: renderVertexShader,
            fragmentShader: renderFragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        this.mesh = new THREE.Points(geometry, this.renderMaterial);
        this.mesh.scale.set(5, -5, 5);
        this.scene.add(this.mesh);
    }

    private fpsInterval = window.innerWidth < 768 ? 1000 / 30 : 0;
    private then = Date.now();

    private animate = () => {
        if (this.isDestroyed) return;
        this.frameId = requestAnimationFrame(this.animate);
        
        if (this.fpsInterval > 0) {
            const now = Date.now();
            const elapsed = now - this.then;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.render();
            }
        } else {
            this.render();
        }
    }

    public render() {
        const time = this.clock.getElapsedTime();
        const dt = time - this.lastTime;
        this.lastTime = time;

        // Smoothly interpolate ring position towards mouse position
        this.ringPos.lerp(this.mousePos, 0.05);

        // 1. Update Sim uniforms
        this.simMaterial.uniforms.uPosition.value = this.everRendered ? this.rt1.texture : this.posTex;
        this.simMaterial.uniforms.uTime.value = time;
        this.simMaterial.uniforms.uDeltaTime.value = dt;
        this.simMaterial.uniforms.uRingPos.value.copy(this.ringPos);
        // Dynamic ring radius
        this.simMaterial.uniforms.uRingRadius.value = 0.175 + Math.sin(time * 1) * 0.03 + Math.cos(time * 3) * 0.02;

        // 2. Render to RT2
        this.renderer.setRenderTarget(this.rt2);
        this.renderer.render(this.simScene, this.simCamera);
        this.renderer.setRenderTarget(null);

        // 3. Render main scene using RT2 texture
        this.renderMaterial.uniforms.uPosition.value = this.everRendered ? this.rt2.texture : this.posTex;
        this.renderMaterial.uniforms.uTime.value = time;
        this.renderMaterial.uniforms.uRingPos.value.copy(this.ringPos);
        
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);

        // 4. Swap render targets
        const temp = this.rt1;
        this.rt1 = this.rt2;
        this.rt2 = temp;
        this.everRendered = true;
    }

    public destroy() {
        this.isDestroyed = true;
        cancelAnimationFrame(this.frameId);
        
        if (this.mesh?.geometry) this.mesh.geometry.dispose();
        if (this.simScene) {
            this.simScene.children.forEach(child => {
                if ((child as THREE.Mesh).geometry) {
                    (child as THREE.Mesh).geometry.dispose();
                }
            });
        }

        this.rt1?.dispose();
        this.rt2?.dispose();
        this.posTex?.dispose();
        this.simMaterial?.dispose();
        this.renderMaterial?.dispose();
        this.renderer?.dispose();
    }
}
