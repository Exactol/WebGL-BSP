export enum Key {
	A = "A",
	B = "B",
	C = "C",
	D = "D",
	E = "E",
	F = "F",
	G = "G",
	H = "H",
	I = "I",
	J = "J",
	K = "K",
	L = "L",
	M = "M",
	N = "N",
	O = "O",
	P = "P",
	Q = "Q",
	R = "R",
	S = "S",
	T = "T",
	U = "U",
	V = "V",
	W = "W",
	X = "X",
	Y = "Y",
	Z = "Z",
	Escape = "Escape",
}

export enum KeyModifier {
	Shift = "Shift",
}

export enum KeyState {
	Keyup,
	Keydown,
}

export class KeyPress {
	public key: Key | null;
	public state: KeyState | undefined | null;
	public modifier: KeyModifier | undefined | null;

	constructor(key: Key | null, state?: KeyState, modifier?: KeyModifier) {
		this.key = key;
		this.modifier = modifier;
		this.state = state;
	}
}