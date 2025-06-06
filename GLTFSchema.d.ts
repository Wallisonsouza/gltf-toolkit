export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];
type AcessorDataType = Float32Array | Uint16Array | Uint32Array | Int8Array | Uint8Array | Int16Array;

export interface GltfObject {
    gltf: GLTF | null;
    bin: ArrayBuffer | null; 
}

export const enum GLTFIdentifier {
    SCALAR = "SCALAR",
    VEC2 = "VEC2",
    VEC3 = "VEC3",
    VEC4 = "VEC4",
    MAT2 = "MAT2",
    MAT3 = "MAT3",
    MAT4 = "MAT4"
}

export const enum GLTFComponentType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    UNSIGNED_INT = 5125,
    FLOAT = 5126
}

export interface GLTFBuffer {
    uri: string;
    byteLength: number;
}

export interface GLTFBufferView {
    buffer: number;
    byteOffset?: number;
    byteLength: number;
    target: number;
}

export interface GLTFAccessor {
    bufferView: number;
    byteOffset?: number;
    componentType: GLTFComponentType;
    count: number;
    type: GLTFIdentifier;
}

export interface GLTFAttributes {
    POSITION: number;
    NORMAL?: number;
    TEXCOORD_0?: number;
    COLOR_0?: number;
    COLOR_1?: number;
}

export interface GLTFPrimitive {
    attributes: GLTFAttributes;
    indices: number;
    material?: number;
}

export interface GLTFMesh {
    primitives: GLTFPrimitive[];
    name?: string;
}

export interface GLTFNode {
    mesh?: number;
    name?: string;
    translation?: Vec3;
    rotation?: Vec4; 
    scale?: Vec3;
    children?: number[]; 
}

export interface GLTFSamplers {
   magFilter: number;
   minFilter: number;
}

export interface GLTFBaseTexture {
    index: number;
    texCoord: number;
}

export interface GLTFPbrMetallicRoughness {
    baseColorFactor?: Vec4;
    baseColorTexture?: GLTFBaseTexture;
    metallicFactor?: number;
    roughnessFactor?: number;
    metallicRoughnessTexture?: GLTFBaseTexture;
}

export interface GLTFMaterial {
    emissiveFactor?: Vec3; 
    emissiveTexture?: GLTFBaseTexture;
    alphaMode?: string; 
    name?: string
    normalTexture?: GLTFBaseTexture;
    occlusionTexture?: GLTFBaseTexture;
    pbrMetallicRoughness?: GLTFPbrMetallicRoughness;
}

export interface GLTFAsset {
    version: string;
    generator: string;
}

export interface GLTF {
    asset: GLTFAsset;
    buffers: GLTFBuffer[];
    bufferViews: GLTFBufferView[];
    accessors: GLTFAccessor[];
    meshes: GLTFMesh[];
    nodes: GLTFNode[];
    images: GLTFImage[];
    textures: GLTFTexture[];
    materials: GLTFMaterial[];
    samplers: GLTFSamplers[];
}

export interface GLTFTexture {
    sampler: number;
    source: number;
}

export interface GLTFImage {
    uri: string;    
    mimeType: string; 
    name?: string;     
}
