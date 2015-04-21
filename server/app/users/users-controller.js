import express from 'express'
export var router = express.Router()


router.get('/', listUsers)
export function listUsers(req, res, next){
	res.json({message: "high"})
}