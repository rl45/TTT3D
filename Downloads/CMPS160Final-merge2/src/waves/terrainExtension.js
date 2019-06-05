class TerrainExt {
	
	constructor(dim, seed, noise) {
	    this.xDim = dim;
		this.zDim = dim;
		this.points = [];
		for (var i = 0; i < this.xDim; i++) {
			this.points[i] = [];
			for (var j = 0; j < this.zDim; j++) {
				this.points[i].push(0.0);
			}
		}

		this.seed = seed;

		this.generateHeights(noise);
	}


	generateHeights(noise) {
		//initialize corners
		this.points[0][0] = Math.random();
		this.points[this.xDim - 1][0] = Math.random();
		this.points[this.xDim - 1][this.zDim - 1] = Math.random();
		this.points[0][this.zDim - 1] = Math.random();

		this.diamondSquare(this.xDim / 2.0, noise);
	}

    /**
	 * Diamond-Square array initialization
	 * heavily based on https://medium.com/@nickobrien/diamond-square-algorithm-explanation-and-c-implementation-5efa891e486f
	 */
	diamondSquare(size, noise) {
		noise = noise * 1.0; //make sure noise is a float
		
		//check for recursion completion
		var half = size / 2.0;
		if (half < 1) {
			return;
		}

		//square steps
		for (var i = half; i < this.xDim; i += size) {
			for (var j = half; j < this.zDim; j += size) {
				this.squareStep(i % this.xDim, j % this.zDim, half, noise);
			}
		}

		//diamond steps
		var col = 0;
		for (var i = 0; i < this.xDim; i += half) {
			col++;
			//check if odd column
			if ((col % 2) == 1) {
				for (var j = half; j < this.zDim; j += size) {
					this.diamondStep(i % this.xDim, j % this.zDim, half, noise);
				}
			} else {
				for (var j = 0; j < this.zDim; j += size) {
					this.diamondStep(i % this.xDim, j % this.zDim, half, noise);
				}
			}
		}

		//recursion
		this.diamondSquare(size / 2.0, noise / 2.0);
	}

	/**
	 * square step of diamondSquare
	 * based on https://medium.com/@nickobrien/diamond-square-algorithm-explanation-and-c-implementation-5efa891e486f
	 */
	squareStep(x, z, reach, noise) {
		var count = 0;
		var avg = 0.0;

		//check if points are in the grid
		if (((x - reach) >= 0) && ((z - reach) >= 0)) {
			avg += this.points[x - reach][z - reach];
			count++;
		}
		if (((x - reach) >= 0) && ((z + reach) < this.zDim)) {
			avg += this.points[x - reach][z + reach];
			count++;
		}
		if (((x + reach) < this.xDim) && ((z - reach) >= 0)) {
			avg += this.points[x + reach][z - reach];
			count++;
		}
		if (((x + reach) < this.xDim) && ((z + reach) < this.zDim)) {
			avg += this.points[x + reach][z + reach];
			count++;
		}

		//calclate avg + noise
		avg += Math.random() * noise * 2 - noise;
		avg /= count;
		this.points[x][z] = avg;
	}

	/**
	 * diamond step of diamondSquare
	 * based on https://medium.com/@nickobrien/diamond-square-algorithm-explanation-and-c-implementation-5efa891e486f
	 */
	diamondStep(x, z, reach, noise) {
		var count = 0;
		var avg = 0.0;

		//check if points are in the grid
		if (x - reach >= 0) {
			avg += this.points[x - reach][z];
			count++;
		}
		if (z - reach >= 0) {
			avg += this.points[x][z - reach];
			count++;
		}
		if (x + reach < this.xDim) {
			avg += this.points[x + reach][z];
			count++;
		}
		if (z + reach < this.zDim) {
			avg += this.points[x][z + reach];
			count++;
		}

		//calclate avg + noise
		avg += Math.random() * noise * 2 - noise;
		avg /= count;
		this.points[x][z] = avg;
	}
}