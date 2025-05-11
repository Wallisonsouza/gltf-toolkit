import { GLTFSamplers, Vec3, Vec4 } from "./GLTFSchema";

export interface ParsedObject {
    node: ParsedNode;
    mesh?: ParsedMesh;
    materials?: ParsedMaterial[];
  
}

export interface ParsedMesh {
    name: string;
    vertices: Float32Array;
    normals?: Float32Array;
    uvs?: Float32Array;
    indices?: number[]
    materialIndex?: number;
}

export interface TextureInfo {
    uri?: string;
    sampler?: GLTFSamplers;
}


export interface ParsedMaterial {
    name: string; 
    baseColor: Vec4;
    emissive: Vec3;
    metallic: number; 
    roughness: number;
    alphaMode: string;
    
    textures?: {
        baseColor?: TextureInfo; // Textura de cor base
        normal?: TextureInfo; // Textura de normal map
        metallicRoughness?: TextureInfo; // Textura de metálico e rugosidade
        emissive?: TextureInfo; // Textura emissiva
        occlusion?: TextureInfo; // Textura de oclusão
    };
}


export interface ParsedNode {
    name: string;
    mesh?: number;
    translation: Vec3;
    rotation: Vec4; 
    scale: Vec3;
    children?: number[];
}