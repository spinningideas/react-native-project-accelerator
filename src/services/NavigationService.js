export function navigateViaRef(ref, name, params) {
  if (ref.current) {
    // Perform navigation if the ref exists 
    ref.current.navigate(name, params);
  } else {
		// TODO: decide what to do -  ignore this, 
		// or create ref and use it to queue you can call later
  }
}
