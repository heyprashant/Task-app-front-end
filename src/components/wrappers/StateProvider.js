import React, {Component} from 'react';
import axios from 'axios';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {objectWithOnly, wrapChildrenWith} from '../../util/common';
import {getAll, addToList, updateStatus, deleteItemById} from '../../services/todo';



class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: []
        }
    }


    async componentWillMount() {
        const AUTH_TOKEN = `Bearer ${this.props.token}`
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        const res = await axios.get('/tasks?sortBy=createdAt:asc')
        this.setState({
            list: res.data
        })
        console.log(res)
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'deleteItem'])
        });

        return (<div>
                    {children}
                </div>)
    }

    async addNew(text) {
        const data = {description: text}
        const res = await axios.post('/tasks', data)
        this.setState( prevState => ({list: prevState.list.concat([res.data])}))
        // let updatedList = addToList({description: text}, this.props.token, this.state.list);
        // this.setState({list: updatedList});
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    async changeStatus(itemId, completed) {
        const data = {completed}
        const res = await axios.patch(`/tasks/${itemId}`,  data)
        console.log(res.data)
        // const updatedList = updateStatus(this.state.list, itemId, completed);
        const updateState = (prevState) => {
            const updatedList = prevState.list.filter( item  => item._id !== itemId)
            return updatedList.concat(res.data)
        }

        this.setState( prevState => ({
            list: updateState(prevState)
        }))
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(text) {
        this.setState({query: text || ''});
    }

    async deleteItem(id) {
        const res = await axios.delete(`/tasks/${id}`)
        this.setState( prevState => ({
            list: prevState.list.filter( item  => item._id !== id)
        }))
        // deleteItemById(id)
        // this.setState({ list: getAll() })
    }
}

export default StateProvider;
