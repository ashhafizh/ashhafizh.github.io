MESSAGES = []
MESSAGES.push delay:0,    text:"Incoming transmission..."
MESSAGES.push delay:1200, text:"Jum'at, 07 Januari 2022, 23:38"
MESSAGES.push delay:2200, text:"mo cerita aja si, tadi pagi kan kamu miskol berkali-kali, <i>aq tau klo kamu yg nelpon (masih ada kontak bheu)</i> , itu aslinya aq awalnya lagi dikamar mandi, trus ada yg pas lagi di cas dikamar teteh, trus ada yg pas ngeleg hpnya, pgn tak jawab tpi malah ngeleg, dan akhirnya kejawab juga, dan fyi aja tapi gapenting sih :v, pas itu kan aq telponan sm kmu diluar rumah trus tb2 bapak dateng wkwkwk langsung lah aq agak jalan cepet ke kamar, dan bapak aq ambil helm. dan itu tuh aslinya mau berangkat buat tes rapid antigen :v, jadi bapak kyknya tau klo aq lagi nelpon, dan bapak aq nungguin aq keluar buat berangkat. padahal mah bukan siap2 berangkat, tpi malah telponan sma kmu wkwk. Jadi, maap yah tadi pagi kayak keburu gtu nelponnya. Ya gtu lah mo gmn lagi. Sekian dari saya. Sehat sehat disana, Zah."
MESSAGES.push delay:3600, text:"Trims,"
MESSAGES.push delay:5200, text:"23:49"

$container = $("#container")
$message = $("#message")
$animate = $("#animate")
$paragraph = null

scramble = (element, text, options) ->

  # Default properties.
  defaults =
    probability: 0.2
    glitches: '-|/\\'
    blank: ''
    duration: text.length * 40
    ease: 'easeInOutQuad'
    delay: 0.0

  # Convert the element to a jQuery object and build the settings object.
  $element = $(element)
  settings = $.extend defaults, options

  # Convenience methods.
  shuffle = () -> if Math.random() < 0.5 then 1 else -1
  wrap = (text, classes) -> """<span class="#{classes}">#{text}</span>"""

  # Glitch values.
  glitchText = settings.glitches
  glitchCharacters = glitchText.split ''
  glitchLength = glitchCharacters.length
  glitchProbability = settings.probability
  glitches = ((wrap letter, 'glitch') for letter in glitchCharacters)

  # Ghost values.
  ghostText = $element.text()
  ghostCharacters = ghostText.split ''
  ghostLength = ghostCharacters.length
  ghosts = ((wrap letter, 'ghost') for letter in ghostCharacters)

  # Text values.
  textCharacters = text.split ''
  textLength = textCharacters.length

  # Order and output arrays.
  order = [0...textLength].sort @shuffle
  output = []

  # Build the output array.
  for i in [0...textLength]
    glitchIndex = Math.floor Math.random() * (glitchLength - 1)
    glitchCharacter = glitches[glitchIndex]
    ghostCharacter = ghosts[i] or settings.blank
    addGlitch = Math.random() < glitchProbability
    character = if addGlitch then glitchCharacter else ghostCharacter
    output.push character

  # Animate the text.
  object = value:0
  target = value:1
  parameters =
    duration:settings.duration
    ease:settings.ease
    step: ->
      progress = Math.floor object.value * (textLength - 1)
      for i in [0..progress]
        index = order[i]
        output[index] = textCharacters[index]
      $element.html output.join ''
    complete: ->
      $element.html text

  # Animate the text.
  $(object).delay(settings.delay).animate target, parameters



animate = () ->
  for data, index in MESSAGES
    element = $paragraph.get index
    element.innerText = ''
    options = delay: data.delay
    scramble element, data.text, options
  return

initialise = () ->
  $animate.click animate
  $message.append "<p>" for text, index in MESSAGES
  $paragraph = $container.find "p"
  animate()
  return

initialise()
