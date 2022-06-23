const VALID_DNA_LETTER_CODES = ['A', 'T', 'G', 'C']
const VALID_AMINO_ACID_CODES = [
  'A',
  'R',
  'N',
  'D',
  'C',
  'Q',
  'E',
  'G',
  'H',
  'I',
  'L',
  'K',
  'M',
  'F',
  'P',
  'S',
  'T',
  'W',
  'Y',
  'V',
]

export const validateSequence = (seq: string, seqType: string) => {
  // assume the sequence is valid
  // then run tests
  let isValid = true
  let message = null

  // test dna
  if (seqType.toLowerCase() === 'dna') {
    // check length
    if (seq.length % 3 !== 0) {
      isValid = false
      message = 'DNA sequences must be divisible by 3.'
    }

    // validate that each character in the sequence
    // is an a, t, c, or g
    seq.split('').forEach((c, i) => {
      if (!VALID_DNA_LETTER_CODES.includes(c.toUpperCase())) {
        isValid = false
        message = `Invalid base '${c}' at position ${i}`
      }
    })
    // test protein
  } else {
    // validate each character in the sequence
    seq.split('').forEach((c, i) => {
      if (!VALID_AMINO_ACID_CODES.includes(c.toUpperCase())) {
        isValid = false
        message = `Invalid residue '${c}' at position ${i}`
      }
    })
  }

  return {
    isValid: isValid,
    message: message,
  }
}
