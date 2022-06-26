<script>
    import { onMount } from 'svelte'
    import { default as QrCode } from 'qrious'
    const QRcode = new QrCode()
    export let errorCorrection = 'M'
    export let background = '#fff'
    export let color = '#000'
    export let size = '200'
    export let value = ''
    export let padding = 0
    export let className = 'qrcode'
    let image = ''
    function generateQrCode() {
        QRcode.set({
            background,
            foreground: color,
            level: errorCorrection,
            padding,
            size,
            value
        })

        image = QRcode.toDataURL('image/jpeg')
    }
    $: {
        if (value) {
            generateQrCode()
        }
    }
    onMount(() => {
        generateQrCode()
    })
</script>

<img src={image} alt={value} class={className} />
