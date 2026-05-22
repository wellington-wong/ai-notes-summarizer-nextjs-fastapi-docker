import axios from 'axios'
import { Note } from '../types/note'



const API = 'http://localhost:8000'

export const getNotes = async (): Promise<Note[]> => {
	const res = await axios.get(`${API}/notes`)
	return res.data
}

export const createNote = async (
	content: string
): Promise<Note> => {
	const res = await axios.post(`${API}/notes`, {
		content,
	})

	return res.data
}

export const summarizeNote = async (
	id: number
): Promise<Note> => {
	const res = await axios.post(
		`${API}/notes/${id}/summarize`
	)

	return res.data
}


