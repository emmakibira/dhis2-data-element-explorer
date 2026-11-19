import i18n from '@dhis2/d2-i18n'
import React, { FC } from 'react'
import classes from '@/App.module.css'

// Start here. Each milestone adds a component from src/components/ below the title.
const App: FC = () => (
    <div className={classes.container}>
        <h1>{i18n.t('Data Element Explorer')}</h1>
    </div>
)

export default App
