// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function that creates a new pAequor object with a given specimen number and DNA array
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,

    // Method that mutates a random base in the DNA array to a different random base
    mutate() {
      let i = Math.floor(Math.random() * this.dna.length);
      let randomBase = returnRandBase();

      // Re-randomize the new base if it is the same as the original base
      while (this.dna[i] === randomBase) {
        randomBase = returnRandBase();
      }

      // Replace the old base with the new base and return the mutated DNA array
      this.dna[i] = randomBase;
      return this.dna;
    },

    // Method that compares the DNA of two pAequor objects and returns the percentage of bases that are the same
    compareDNA(pAequor) {
      let similarities = 0;
      for (let i = 0; i < this.dna.length && i < pAequor.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          similarities++;
        }
      }
      let percentSimilar = ((similarities / this.dna.length) * 100).toFixed();
      return `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentSimilar}% DNA in common.`;
    },

    // Method that checks if the pAequor object is likely to survive, based on the percentage of CG bases in its DNA
    willLikelySurvive() {
      // Filter the DNA array to only include C and G bases, then get the length of the filtered array
      const countCG = this.dna.filter((base) => base === "C" || base === "G")
        .length;
      // Calculate the percentage of C and G bases in the DNA array
      const percentageCG = (countCG / this.dna.length) * 100;
      // Return true if the percentage of C and G bases is greater than or equal to 60, false otherwise
      return percentageCG >= 60;
    },
  };
};

// Create 30 instances of pAequor using pAequorFactory() that can survive in their natural environment and store in an array
const thirtySurvivors = [];
let num = 1;

while (thirtySurvivors.length < 30) {
  let newOrganism = pAequorFactory(num, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    thirtySurvivors.push(newOrganism);
  }
  num++;
}