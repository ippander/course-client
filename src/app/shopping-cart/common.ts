import { Enrollment } from '../redux/reducers'
import { Swimmer } from '../service'

const MEMBERSHIP_PRICE = 28

export const totalCourses = (enrollments: Enrollment[]) => {

	let courseFees = 0

	enrollments.forEach(e => {
		courseFees += e.event.price * 100
	})

	return courseFees
}

export const enrolledNonMembers = (swimmers: Swimmer[], enrollments: Enrollment[]): Swimmer[] => {
	return swimmers
		.filter(s => !s.isMember)
		.filter(s => enrollments.find(e => s.id === e.swimmer.id) !== undefined)
}

export const totalMemberships = (swimmers: Swimmer[], enrollments: Enrollment[]) => {

	let memberships = 0

	enrolledNonMembers(swimmers, enrollments).forEach(() => memberships += MEMBERSHIP_PRICE * 100)

	return memberships
}

export const total = (swimmers: Swimmer[], enrollments: Enrollment[]) => {
	return totalCourses(enrollments) + totalMemberships(swimmers, enrollments)
}