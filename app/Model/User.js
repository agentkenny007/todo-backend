'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
    static get hidden(){
        return ['password']
    }
}

module.exports = User
