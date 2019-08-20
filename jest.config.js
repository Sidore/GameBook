module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "transform": {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "preset": "@shelf/jest-mongodb",
  }