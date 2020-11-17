import { github } from "../constants/github";

export const validatePush = (req, res, next) => {
  const {body: { repository, pusher }} = req

  if(repository && !pusher) {
    console.log("Not push but OK")
    return res.sendStatus(200)
  }

  const repo = github.repositories.find(({name}) => name === repository.name)

  if(!repo || !repo.users.includes(pusher.name)) {
    console.log("Unauthorized")
    return res.sendStatus(401)
  }

  return next()
} 