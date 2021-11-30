export class EntryAlreadyExistsError extends Error {
  constructor(message) {
    super(message)
  }
}

export class EntryDoesNotExistError extends Error {
  constructor(message) {
    super(message)
  }
}