import {
    GLTF, 
    GltfObject, 
    GLTFSamplers,
} from "./GLTFSchema";

import {
    ParsedMaterial, 
    TextureInfo, 
} from "./GLTFParsed";
import { extractMeshes } from "./ExtractMeshs";
import { extractNodes } from "./ExtractNodes";



export default class GLTFParser {

    static parse(object: GltfObject) {
        if(!object.gltf) {
            throw new Error("aaaaaaaaaaaa")
        }

        if(!object.bin) {
            throw new Error("bbbbbbbbbbbbbbb")
        }
        
        const materials = this.extractMaterials(object.gltf);
        const meshes = extractMeshes(object.gltf.meshes, object.gltf, object.bin);
        const nodes = extractNodes(object.gltf.nodes, object.gltf);
    
        return { nodes, meshes, materials };
    }

  
    private static extractMaterials(gltf: GLTF): ParsedMaterial[] {
        const parsedMaterials: ParsedMaterial[] = [];
    
        if (gltf.materials) {
            gltf.materials.forEach((material, index) => {
                const { 
                    pbrMetallicRoughness, 
                    normalTexture, 
                    occlusionTexture, 
                    alphaMode, 
                    name, 
                    emissiveTexture,
                    emissiveFactor
                } = material;
                const { 
                    baseColorTexture, 
                    metallicRoughnessTexture 
                } = pbrMetallicRoughness || {};
    
                const parsedMaterial: ParsedMaterial = {
                    name: name || `Unnamed Material${index}`,
                    baseColor: pbrMetallicRoughness?.baseColorFactor ?? [0, 0, 0, 1],
                    metallic: pbrMetallicRoughness?.metallicFactor ?? 1.0,
                    roughness: pbrMetallicRoughness?.roughnessFactor ?? 1.0,
                    alphaMode: alphaMode ?? "OPAQUE",
                    emissive: emissiveFactor ?? [0, 0, 0],
                    textures: {
                        baseColor: baseColorTexture ? this.processTexture(gltf, baseColorTexture.index) : undefined,
                        normal: normalTexture ? this.processTexture(gltf, normalTexture.index) : undefined,
                        emissive: emissiveTexture ? this.processTexture(gltf, emissiveTexture.index) : undefined,
                        metallicRoughness: metallicRoughnessTexture ? this.processTexture(gltf, metallicRoughnessTexture.index) : undefined,
                        occlusion: occlusionTexture ? this.processTexture(gltf, occlusionTexture.index) : undefined
                    }
                };
                parsedMaterials.push(parsedMaterial);
            });
        }
    
        return parsedMaterials;
    }

    private static getTextureURI(gltf: GLTF, textureIndex: number | undefined): string | undefined {
        if (textureIndex !== undefined) {
            const texture = gltf.textures[textureIndex];
            return gltf.images[texture.source]?.uri;
        }
        return undefined;
    }
    
    private static getSampler(gltf: GLTF, textureIndex: number | undefined): GLTFSamplers |undefined{
        if (textureIndex !== undefined) {
            const texture = gltf.textures[textureIndex];
            if (texture.sampler !== undefined) {
                return gltf.samplers[texture.sampler];
            }
        }
        return undefined;
    }
    
    private static processTexture(gltf: GLTF, textureIndex: number | undefined): TextureInfo {
        const uri = this.getTextureURI(gltf, textureIndex);
        const sampler = this.getSampler(gltf, textureIndex);
        
        return {
            sampler,
            uri
        };
    }
    
}

