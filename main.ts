namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const BossProjectile = SpriteKind.create()
    export const PlayerProjectile = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    left = false
    right = true
    up = true
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (abletoshoot) {
        projectile2 = sprites.createProjectileFromSprite(img`
            . 8 8 . 
            8 6 6 8 
            8 6 6 8 
            . 8 8 . 
            `, Hero, 0, -100)
        projectile2.setKind(SpriteKind.PlayerProjectile)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    left = true
    right = false
    up = false
})
function ArcransisSmash () {
    Arcransis.setPosition(Hero.x, Hero.y - 80)
    Arcransis.say("Teleporting Smash")
    pause(1000)
    Arcransis.vy = 200
    pause(400)
    scene.cameraShake(4, 500)
    pause(1000)
    Arcransis.setPosition(Hero.x, Hero.y - 80)
    pause(1500)
    MakeMove()
}
sprites.onOverlap(SpriteKind.BossProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(1000)
})
function ArcransisShoot () {
    Arcransis.say("Shoot")
    for (let index = 0; index < 4; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . 9 9 . . . 
            . . 6 6 6 6 . . 
            . 6 8 8 8 8 6 . 
            9 6 8 9 9 8 6 9 
            9 6 8 9 9 8 6 9 
            . 6 8 8 8 8 6 . 
            . . 6 6 6 6 . . 
            . . . 9 9 . . . 
            `, Arcransis, 100, 100)
        projectile3 = sprites.createProjectileFromSprite(img`
            . . . 9 9 . . . 
            . . 6 6 6 6 . . 
            . 6 8 8 8 8 6 . 
            9 6 8 9 9 8 6 9 
            9 6 8 9 9 8 6 9 
            . 6 8 8 8 8 6 . 
            . . 6 6 6 6 . . 
            . . . 9 9 . . . 
            `, Arcransis, 0, 100)
        projectile4 = sprites.createProjectileFromSprite(img`
            . . . 9 9 . . . 
            . . 6 6 6 6 . . 
            . 6 8 8 8 8 6 . 
            9 6 8 9 9 8 6 9 
            9 6 8 9 9 8 6 9 
            . 6 8 8 8 8 6 . 
            . . 6 6 6 6 . . 
            . . . 9 9 . . . 
            `, Arcransis, -100, 100)
        projectile.setKind(SpriteKind.BossProjectile)
        projectile3.setKind(SpriteKind.BossProjectile)
        projectile4.setKind(SpriteKind.BossProjectile)
        pause(500)
    }
    pause(2000)
    MakeMove()
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    Arcransis.say("NOOOOOOO", 1000)
    pause(1000)
    Arcransis.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    Arcransis.destroy()
    pause(1000)
    game.over(true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    left = false
    right = true
    up = false
})
sprites.onOverlap(SpriteKind.PlayerProjectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy()
    BossHealth.value += -1
})
function ArcransisTeleport () {
    Arcransis.setPosition(randint(50, 110), randint(1, 50))
    Arcransis.say("teleport", 500)
    pause(500)
    MakeMove()
}
function MakeMove () {
    if (conversationFinished) {
        ArcransisMove = randint(0, 2)
        if (ArcransisMove == 0) {
            ArcransisSmash()
        } else if (ArcransisMove == 1) {
            ArcransisTeleport()
        } else if (ArcransisMove == 2) {
            ArcransisShoot()
        }
        pause(1000)
    }
}
function CallWarConversation () {
    Arcransis.say("So this is it isn't it You bluehead. You can't stop me.", 7000)
    pause(7000)
    Hero.say("We'll see about that.", 2000)
    pause(2000)
    conversationFinished = true
    abletoshoot = true
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(1000)
})
let ArcransisMove = 0
let conversationFinished = false
let projectile4: Sprite = null
let projectile3: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let abletoshoot = false
let up = false
let right = false
let left = false
let BossHealth: StatusBarSprite = null
let Hero: Sprite = null
let Arcransis: Sprite = null
Arcransis = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Boss)
Arcransis.setPosition(80, 20)
Arcransis.setFlag(SpriteFlag.StayInScreen, true)
Hero = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e f c . . . . 
    . f d d d d e e e f f . . . . . 
    . . f f f f f e e e e f . . . . 
    . . . . f f e e e e e e f . f f 
    . . . f e e f e e f e e f . e f 
    . . f e e f e e f e e e f . e f 
    . f b d f d b f b b f e f f e f 
    . f d d f d d f d d b e f f f f 
    . . f f f f f f f f f f f f f . 
    `, SpriteKind.Player)
Hero.setPosition(80, 100)
Hero.ay = 200
controller.moveSprite(Hero, 100, 0)
Hero.setFlag(SpriteFlag.StayInScreen, true)
tiles.setTilemap(tilemap`level1`)
info.setLife(5)
BossHealth = statusbars.create(150, 4, StatusBarKind.Health)
BossHealth.y = 115
BossHealth.max = 100
BossHealth.value = 100
CallWarConversation()
MakeMove()
