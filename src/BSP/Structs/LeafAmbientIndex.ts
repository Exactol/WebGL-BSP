export class LeafAmbientIndex {
	public ambientSampleCount: number;
	public firstAmbientSample: number;

	public constructor(ambientSampleCount: number, firstAmbientSample: number) {
		this.ambientSampleCount = ambientSampleCount;
		this.firstAmbientSample = firstAmbientSample;
	}

	public toString() {
		return `AmbientSampleCount: ${this.ambientSampleCount}
FirstAmbientSample: ${this.firstAmbientSample}`;
	}
}