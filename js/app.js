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
}

const movePhoto = (photo, page) => {
    const photos = [...document.querySelectorAll(`.page:nth-child(${page + 1}) .photo`)]

    photos.forEach((p, i) => {
        p.style.left = (i === photo)
            ? 0
            : screenWidth + 'px'
    })
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
window.addEventListener('touchmove', scrollHandler)
