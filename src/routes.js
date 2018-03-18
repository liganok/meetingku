import React from 'react'
import {Route, Switch } from 'react-router-dom'

import Auth from './components/Auth/Auth'
import Register from './components/Auth/Register'
import Setting from './components/Setting/Setting'
import AgendaList from './components/Agenda/Agenda'
import AgendaItem from './components/common/AgendaItem'
import AgendaDetail from './components/Detail/AgendaDetail'
import Play from './components/Play/AgendaPlay'
import TemplateList from './components/Template/Template'
import TrashList from './components/Trash/Trash'
import Help from './components/Help/Help'
import OAuth from './components/Auth/OAuth'

import Status from './components/common/Status'


export default (
    <Switch>
        <Route exact path='/' component={AgendaList} />
        <Route path='/auth' component={Auth} />
        <Route path='/register' component={Register} />
        <Route path='/AgendaItem' component={AgendaItem} />
        <Route path='/template/detail/:id' component={AgendaDetail} />
        <Route path='/template/play/:id' component={Play} />
        <Route path='/agenda/detail/:id' component={AgendaDetail} />
        <Route path='/agenda/play/:id' component={Play} />
        <Route path='/agenda/new' component={AgendaDetail} />
        <Route path='/setting' component={Setting} />
        <Route path='/agenda' component={AgendaList} />
        <Route path='/template' component={TemplateList} />
        <Route path='/trash' component={TrashList} />
        <Route path='/help' component={Help} />
        <Route path='/oauth/:name' component={OAuth} />

        <Route path='/Status' component={Status} />

    </Switch>
)