let activePage  = 0
let activePhoto = 0

const screenHeight = 2000
const screenWidth = 2000

let isMoveInProgress = false

document.addEventListener('keydown', ev => {
    const arrowKeys = [
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp'
    ];

    if (!arrowKeys.includes(ev.key)) {
        return true
    }

    if (isMoveInProgress) {
        ev.preventDefault()
        return false
    }

    isMoveInProgress = true

    setTimeout(() => { isMoveInProgress = false }, 500 )
    
    ev.preventDefault()

    switch (ev.key) {
        case 'ArrowDown':
            if (activePage < 4) {
                movePage(++activePage)
            }
            break

        case 'ArrowLeft':
            if (activePhoto > 0) {
                movePhoto(--activePhoto, activePage)
            }
            break

        case 'ArrowRight':
            if (activePhoto < 3) {
                movePhoto(++activePhoto, activePage)
            }
            break;

        case 'ArrowUp':
            if (activePage > 0) {
                movePage(--activePage)
            }
            break

    }
})

const movePage = (page) => {
    const pages = [...document.querySelectorAll('.page')]

    pages.forEach((p, i) => {
        p.style.top = (i === page)
            ? 0
            : screenHeight + 'px'

        movePhoto(0, i)
    })

    activePhoto = 0

    if (activePage === 0) {
        document.querySelector('.icono-caretUp').classList.add('hidden')
    } else {
        document.querySelector('.icono-caretUp').classList.remove('hidden')
    }

    if (activePage === 4) {
        document.querySelector('.icono-caretDown').classList.add('hidden')
    } else {
        document.querySelector('.icono-caretDown').classList.remove('hidden')
    }
}

const movePhoto = (photo, page) => {
    const photos = [...document.querySelectorAll(`.page:nth-child(${page + 1}) .photo`)]

    photos.forEach((p, i) => {
        p.style.left = (i === photo)
            ? 0
            : screenWidth + 'px'
    })

    if (activePhoto === 0) {
        document.querySelector('.icono-caretLeft').classList.add('hidden')
    } else {
        document.querySelector('.icono-caretLeft').classList.remove('hidden')
    }

    if (activePhoto === 3) {
        document.querySelector('.icono-caretRight').classList.add('hidden')
    } else {
        document.querySelector('.icono-caretRight').classList.remove('hidden')
    }
}

const scrollHandler = ev => {
    const deltaThreshold = 100

    if (ev.wheelDeltaY >= deltaThreshold) {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp'}))

        return
    }

    if (ev.wheelDeltaY <= (-1 * deltaThreshold)) {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}))
        return
    }


    if (ev.wheelDeltaX >= deltaThreshold) {
       document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}))
    }

    if (ev.wheelDeltaX <= (-1 * deltaThreshold)) {
       document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}))
    }
}

window.addEventListener('mousewheel', scrollHandler)

window.addEventListener('click', ev => {

    if (ev.target.className.includes('Down')) {
        if (activePage < 4) {
            movePage(++activePage)
        }
    }

    if (ev.target.className.includes('Left')) {
        if (activePhoto > 0) {
            movePhoto(--activePhoto, activePage)
        }
    }

    if (ev.target.className.includes('Right')) {
        if (activePhoto < 3) {
            movePhoto(++activePhoto, activePage)
        }
    }

    if (ev.target.className.includes('Up')) {
        if (activePage > 0) {
            movePage(--activePage)
        }
    }

})

