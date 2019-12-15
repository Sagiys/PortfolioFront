import React, {useEffect, useRef} from 'react';
import * as THREE from "three";
import { IoIosArrowRoundForward } from "react-icons/io";

function LandingPage() {
    let container = useRef(null);

    useEffect(() => {
        window.addEventListener( 'resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );

        let scene, camera, renderer, starGeo, stars, image;
        image = new Image();
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TxSIVB4uIOGSourQgKuIoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIi6uToouU+L+k0CLGg+N+vLv3uHsHCI0KU82uCUDVLCMVj4nZ3KrY84ogAhjEOCISM/VEejEDz/F1Dx9f76I8y/vcn6NPyZsM8InEc0w3LOIN4plNS+e8TxxiJUkhPieOGHRB4keuyy6/cS46LPDMkJFJzROHiMViB8sdzEqGSjxNHFZUjfKFrMsK5y3OaqXGWvfkLwzmtZU012mOII4lJJCECBk1lFGBhSitGikmUrQf8/APO/4kuWRylcHIsYAqVEiOH/wPfndrFqYm3aRgDOh+se2PUaBnF2jWbfv72LabJ4D/GbjS2v5qA5j9JL3e1sJHQP82cHHd1uQ94HIHGHrSJUNyJD9NoVAA3s/om3LAwC3Qu+b21trH6QOQoa6Wb4CDQ2CsSNnrHu8OdPb275lWfz+/6HLGBRDGtAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+MMCBYpGWTG7osAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAtUlEQVQ4y7WVvQ3CMBBGny2k9NQU1KlZIjOkzjpRlmCGLJE2NRRZIgLpozmk/CARyPlJLmz5nqyz7xwk8YEMKIECuAAnWx+ADmiBKzCuIiUtRyWp13d62zuLn06Okmr9Tm2xK+E/sql0Jqy0n+otzDbmbEtOs2i3mbOfHCijPQ0viiDpBpydhPcg6QEcnITPiDPRysmLIVptetFFK3Qv2iQPewQah9M1wJisOSRpXy4NNnh/AS8qT77FrH9ftgAAAABJRU5ErkJggg==";
        var texture = new THREE.Texture();
        texture.image = image;
        image.onload = function() {
            texture.needsUpdate = true;
        };

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.z = 1;
        camera.rotation.x = Math.PI/2;

        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.current.appendChild(renderer.domElement);

        starGeo = new THREE.Geometry();
        for(let i =0; i<6000; i++){
            let star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
            star.velocity = 0;
            star.acceleration = 0.02;

            starGeo.vertices.push(star)
        }
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7,
            map: texture,
            alphaMap: texture,
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);
        const animate = () => {
            starGeo.vertices.forEach(p=>{
                p.velocity += p.acceleration;
                p.y -= p.velocity;
                if(p.y < -200){
                    p.y = 200;
                    p.velocity = 0;
                }
            });
            starGeo.verticesNeedUpdate = true;
            stars.rotation.y += 0.002;
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        }
        animate();


    }, []);

    return (
        <div className="landing-container" ref={container}>
            <div className="landing-text">
                Hello, I'm Adam. <br/>
                I'm software developer that <br/>
                'loves' css!
            </div>
            <div className="landing-arrow"></div>
        </div>
    )
}

export default LandingPage;