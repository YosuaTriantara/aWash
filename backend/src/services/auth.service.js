const prisma = require('../config/database')
const { hashPassword, comparePassword } = require('../utils/password')
const { generateToken } = require('../utils/jwt')

const register = async (data) => {
    // cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })
    if (existingUser) throw new Error('Email sudah terdaftar')

    // cek apakah no_telepon sudah terdaftar
    const existingPhone = await prisma.user.findFirst({
        where: {
            no_telepon: data.no_telepon
        }
    })
    if (existingPhone) throw new Error('Nomor telepon sudah terdaftar')

    const passwordHash = await hashPassword(data.password)

    // buat user dulu
    const user = await prisma.user.create({
        data: {
            nama: data.nama,
            email: data.email,
            password_hash: passwordHash,
            no_telepon: data.no_telepon,
            role: 'CUSTOMER' 
        }
    })

    // buat data customer yang terhubung ke user
    await prisma.customer.create({
        data: {
            id_user: user.id_user,
            alamat: data.alamat,
            tanggal_lahir: data.tanggal_lahir ? new Date(data.tanggal_lahir) : null
        }
    })

    return { id_user: user.id_user, email: user.email, role: user.role }
}

const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) throw new Error('Email tidak ditemukan')

    if (!user.is_active) throw new Error('Akun tidak aktif')

    const cocok = await comparePassword(password, user.password_hash)
    if (!cocok) throw new Error('Password salah')

    // update last_login
    await prisma.user.update({
        where: { id_user: user.id_user },
        data: { last_login: new Date() }
    })

    const token = generateToken({
        id_user: user.id_user,
        role: user.role
    })

    return { token, role: user.role }
}

module.exports = { register, login }