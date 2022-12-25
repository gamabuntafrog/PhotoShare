const header = {
    header: (color: string, colorMode: 'dark' | 'light') => {

        return ({
            borderBottom: `15px solid ${color}`,
            padding: '0 0',
            bgcolor: colorMode === 'dark' ? 'background.default' : 'background.paper',
            color: 'text.primary',
            zIndex: 100,
            boxShadow: `0px 10px 30px -14px ${color}`,
            // borderRadius: '0px 0px 60px 60px'
        })
    },
    container: () => {

        return ({
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'space-around',
            fontSize: '24px'
        })
    },
    link: () => {

        return ({
            // color: 'black',
            marginLeft: '12px'
        })
    },
    activeLink: (color: string) => {

        return ({
            color: color,
            marginLeft: '12px',
            textShadow: `0px 0px 30px ${color}`
        })
    },
    navContainer: () => {

        return ({
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        })
    }
}

export default header