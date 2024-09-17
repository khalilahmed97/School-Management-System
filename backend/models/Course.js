const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({

  id: {
    type: String,
    required:true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  abbreviation: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  tutor: {
    type: [Schema.Types.ObjectId],
    ref: 'User', // Reference to the User model
    required: true
  },
  picture: {
    type: String,
    default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDRUNDxAVFRUVFRUVFRUVFR0dFRUVHh0XFxcXFxcYHSgtJR0lHR8dITEhJSktLjouHSc1ODMvNy8zNSsBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBFAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQQDBQIH/8QAMRABAAEBAwgKAwADAAAAAAAAAAECBBEUAzEyUVJxgZEFITNBgqGxwdHhEmHwE0Ji/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP0xFQAAAAAAAAAAAAAAAAAAAABUUEAAAAAAAAAA/u5UUEAAAAAAAAAAUQAAAAAAAAAABUUEFQAAAAAAAAFEUEAAAAAAAAAByy+Xii7qvvv9nLHRszzfPSOenxez5s9miqm+ZnODpjo2Z5mOjZnmuBp2p8vhMDTrny+AMdGzPN90Wuidcb/p8YGnXPk55SxVRozf6g3RN/XA8zJZWqifWJ/s7Tl7X1R+OefL7B3ymVppzz8uM22nuiWTJZKquerjMtNNhjvqnhALjo2Z5mOjZ81wNOufL4MDTrny+ATHRszzMdGzPNcDTrny+GPLUfjVNMdwPVpm+LxMnoxuhQAAAAAAAAFT+7lBAAAAAAAAAAY+kc9Pi9nSw6HGXPpHPT4vZ0sOhxkGgAAAGW3ZLq/OM8Z9zHk6PyqinW9K06FW5isXaRx9AehRTERdGZQAVFAeXau0q4ekPTeZau0q4ekA9LJ6MboVKNGN0KAAAAAAAAAqKCAAAAAAAAqADH0jnp8Xs6WHQ4y59I56fF7Olh0OMg0AAAA52jQq3SxWLtI4ttp0Kt0sVj7SOIPRAAUAR5lr7Srh6Q9N5lr7Srh6QD0qM0boVKM0boUAAAAAABUUARQQAAAAABUUEABi6Rz0+L2dbDocZ9nLpHPT4vZ1sOhxkGgAAAHO06FW6WKx9pHFttGhVulisXaRxB6IAAKCPMtXaVcPSHpvMtXaVcPSAelRoxuhUo0Y3QoAAAAAAKIoJ/dyooIAAAACgCAAAMfSOenxezpYdDjLn0jnp8Xs6WHQ4yDQAAADnaNCrdLFYu0ji22jQq3SxWLtI4g9EAAAB5lq7Srh6Q9N5lr7Srh6QD0snoxuhUyejG6FAAAAAVFBAAFAEAAAAVFBBUAABj6Rz0+L2LLl6aabpnvnul1tWQmu66c1/nd8OGCq1wDRi6NflPwmLyevyn4cMFVrgwVWuAd8Xk9flPw6UZWmrNMbvpkwVWuHLK2eqnrmOrXAN9p7OrdLFYu0jiU2ifxmmeu+Junvh8ZHKfjV+V2sHqTN3W5VWqiP9uUT7MFddVc69UR7Q602Kqc90f36BpxdGvyn4TF5PX5T8OOBnagwU7UA74vJ6/KfhhtFUTXMxm+od8DOuEwM7UA25PRjdCpTF0RCgAAAAKiggAKIoIAAAAoAgAAAM9ry9VF113Xfn4OGNr/XL7ba8nTVni984ejZgGTGV/rl9pjK/wBcvtsw9GzBh6NmAZMZX/zy+33RbtqOXxLvh6NmHLK2OLr6eqdXcDhaaKdOjNPlLjEEVXRMa7imq6b4BtproyUfjnq77nOq21d0R6uWQyM1zdzltpstEd1++QZsbX+uX2Yyv9cvtrw9GzBh6NmAZMZX+uU/JjK/1y+2vD0bMGHo2YB90zfET+lIAAAAABUAAAVFBAAAUBFQAAAAAAAAAAHx/hp2aeUH+GjZp5Q+1B800RGaIjdCgAAAAAAAAAoAIAAAH93qiggAKgAqAAAAAAAAAAAAKgAAAAAAAACoAoIAAAAB/dwKCKACKAgoCCgIKAgoAigAAIKAgoCCgIKAgoCCgCKAgoCCgJeoA//Z' // Change this to the actual default picture URL
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;