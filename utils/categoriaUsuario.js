// Esse módulo serve para sanitizar a informação do tipo do usuário, para que não fique:
// Usuário: XPTO, tipo: 0
// fica: Usuário XPTO: tipo: Administrador
export default {
    0: 'Administrador',
    1: 'Usuário Comum'
}