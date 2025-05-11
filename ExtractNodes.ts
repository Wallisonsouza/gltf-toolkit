import { ParsedNode } from "./GLTFParsed";
import { GLTF, GLTFNode } from "./GLTFSchema";

export function extractNodes(nodes: GLTFNode[], gltf: GLTF): ParsedNode[] {
    const parsedNodes: ParsedNode[] = [];

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const parsedNode: ParsedNode = {
            name: node.name ?? `Node_${i}`,
            mesh: node.mesh,
            translation: node.translation ?? [0, 0, 0],
            rotation: node.rotation ?? [0, 0, 0, 1],
            scale: node.scale ?? [1, 1, 1],
            children: node.children
        };

        parsedNodes.push(parsedNode);
    }

    return parsedNodes;
}
