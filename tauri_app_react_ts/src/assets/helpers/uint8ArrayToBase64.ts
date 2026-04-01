function uint8ArrayToBase64(bytes: Uint8Array): string {
	const blob = new Blob([new Uint8Array(bytes)])
	const reader = new FileReader()

	return new Promise((resolve) => {
		reader.onload = () => {
			const result = reader.result as string
			resolve(result)
		}
		reader.readAsDataURL(blob)
	}) as unknown as string
}

export default uint8ArrayToBase64