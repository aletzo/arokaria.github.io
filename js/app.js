let activePage       = 0
let activePageZindex = 12

let activePhoto       = 0
let activePhotoZindex = 0

const screenHeight = 2000
const screenWidth = 2000

let isMoveInProgress = false

const moveDuration = 500

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

    setTimeout(() => { isMoveInProgress = false }, moveDuration)
    
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

const movePage = page => {
    const pages = [...document.querySelectorAll('.page')]

    activePageZindex++

    pages[page].style.top    = 0
    pages[page].style.zIndex = activePageZindex

    setTimeout(() => {
        pages.forEach((p, i) => {
            if (i !== page) {
                p.style.top = screenHeight + 'px'

                movePhoto(0, i)
            }
        })
    }, moveDuration)

    activePhoto = 0

    if (activePage === 0) {
        document.querySelector('.icon.top').classList.add('hidden')
    } else {
        document.querySelector('.icon.top').classList.remove('hidden')
    }

    if (activePage === 4) {
        document.querySelector('.icon.bottom').classList.add('hidden')
    } else {
        document.querySelector('.icon.bottom').classList.remove('hidden')
    }

    if (activePhoto === 0) {
        document.querySelector('.icon.left').classList.add('hidden')
    } else {
        document.querySelector('.icon.left').classList.remove('hidden')
    }

    if (activePhoto === 3) {
        document.querySelector('.icon.right').classList.add('hidden')
    } else {
        document.querySelector('.icon.right').classList.remove('hidden')
    }
}

const movePhoto = (photo, page) => {
    const photos = [...document.querySelectorAll(`.page:nth-child(${page + 1}) .photo`)]

    activePhotoZindex++

    photos[photo].style.left   = 0
    photos[photo].style.zIndex = activePhotoZindex

    setTimeout(() => {
        photos.forEach((p, i) => {
            if (i !== photo) {
                p.style.left = screenHeight + 'px'
            }
        })
    }, moveDuration)

    if (activePhoto === 0) {
        document.querySelector('.icon.left').classList.add('hidden')
    } else {
        document.querySelector('.icon.left').classList.remove('hidden')
    }

    if (activePhoto === 3) {
        document.querySelector('.icon.right').classList.add('hidden')
    } else {
        document.querySelector('.icon.right').classList.remove('hidden')
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

    if (ev.target.className.includes('bottom')) {
        if (activePage < 4) {
            movePage(++activePage)
        }
    }

    if (ev.target.className.includes('left')) {
        if (activePhoto > 0) {
            movePhoto(--activePhoto, activePage)
        }
    }

    if (ev.target.className.includes('right')) {
        if (activePhoto < 3) {
            movePhoto(++activePhoto, activePage)
        }
    }

    if (ev.target.className.includes('top')) {
        if (activePage > 0) {
            movePage(--activePage)
        }
    }

})


let x = 0
let previousX = 0

let y = 0
let previousY = 0

const threshold = 5

const moveHandler = ev => {
    let touch

    if (ev.touches) {
        touch = ev.touches[0]
    }

    x = touch.pageX
    y = touch.pageY

    const diffX = Math.abs(x - previousX)
    const diffY = Math.abs(y - previousY)
    
    if (diffX < diffY && diffY > threshold) {
        if (y > previousY) {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}))
        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp'}))
        }

        previousY = y
    }

    if (diffX > diffY && diffX > threshold) {
        if (x > previousX) {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}))
        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}))
        }

        previousX = x
    }
}

window.addEventListener('touchmove', moveHandler)
