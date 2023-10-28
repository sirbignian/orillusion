import {
    View3D, DirectLight, Engine3D,
    PostProcessingComponent, LitMaterial, HoverCameraController,
    KelvinUtil, MeshRenderer, Object3D, PlaneGeometry, Scene3D, SphereGeometry,
    CameraUtil, webGPUContext, BoxGeometry, TAAPost, AtmosphericComponent, GTAOPost, Color, BloomPost, BitmapTexture2D
} from '@orillusion/core';
import { GUIHelp } from '@orillusion/debug/GUIHelp';
import { GUI } from '@orillusion/debug/dat.gui.module';
import { GUIUtil } from '@samples/utils/GUIUtil';
import { EarthGeometry } from './EarthGeometry';

export class Sample_earth {
    lightObj: Object3D;
    scene: Scene3D;

    async run() {
        Engine3D.setting.shadow.shadowSize = 2048
        Engine3D.setting.shadow.shadowBound = 500;

        await Engine3D.init();

        this.scene = new Scene3D();
        let sky = this.scene.addComponent(AtmosphericComponent);
        sky.sunY = 0.9;

        let mainCamera = CameraUtil.createCamera3DObject(this.scene, 'camera');
        mainCamera.perspective(45, webGPUContext.aspect, 0.001, 5000.0);
        let ctrl = mainCamera.object3D.addComponent(HoverCameraController);
        ctrl.setCamera(0, -15, 500);
        // sky.relativeTransform = this.lightObj.transform;


        let view = new View3D();
        view.scene = this.scene;
        view.camera = mainCamera;
        Engine3D.startRenderView(view);

        let postProcessing = this.scene.addComponent(PostProcessingComponent);
        let post = postProcessing.addPost(BloomPost);
        GUIHelp.init();
        GUIUtil.renderBloom(post, true);
        GUIUtil.renderAtmosphericSky(sky, true);
        GUIUtil.renderCamera(view.camera);

        await this.initScene();
    }

    async initScene() {
        {
            this.lightObj = new Object3D();
            this.lightObj.rotationX = 45;
            this.lightObj.rotationY = 110;
            this.lightObj.rotationZ = 0;
            let lc = this.lightObj.addComponent(DirectLight);
            lc.lightColor = KelvinUtil.color_temperature_to_rgb(5355);
            lc.castShadow = true;
            lc.intensity = 10;
            this.scene.addChild(this.lightObj);
        }

        {
            let tex = await Engine3D.res.loadTexture("textures/earth/earth_diffuse.jpg") as BitmapTexture2D;
            let mat = new LitMaterial();
            mat.roughness = 1.0;
            mat.metallic = 0.1;
            mat.baseMap = tex;

            let sphere = new EarthGeometry();
            let earth = new Object3D();
            let mr = earth.addComponent(MeshRenderer);
            mr.material = mat;
            mr.geometry = sphere;
            // earth.scaleX = 100;
            // earth.scaleY = 100;
            this.scene.addChild(earth);

            // Engine3D.views[0].graphic3D.drawMeshWireframe(`earth`, sphere, earth.transform);

        }
    }
}

