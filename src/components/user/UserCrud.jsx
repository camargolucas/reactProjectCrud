import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Tela de Cadastro de usuarios'
}
const url = 'http://localhost:3001/users';
const initialState = {
    user: { name: '', email: '' },
    list: []
}


export default class UserCrud extends Component {

    state = { ...initialState };


    clear() {
        this.setState({ user: initialState.user });
    }


    componentWillMount() {

        axios(url).then(resp => {
            this.setState({ list: resp.data })
        })

    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
       
        axios.delete(`${url}/${user.id} `).then(resp => {

            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>
                            Nome
                    </th>
                        <th>
                            Email
                    </th>
                        <th>
                            Acoes
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {

        return this.state.list.map(result => {

            return (
                <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>
                        <button onClick={() => this.load(result)} className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button onClick={() => this.remove(result)} className="btn btn-danger ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const Localurl = user.id ? `${url}/${user.id}` : url;

        axios[method](Localurl, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data, true)

                this.setState({ user: initialState.user, list });
            })
    }


    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)

        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="digite o nome" />

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="digite o email" />

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 f-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
       
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
