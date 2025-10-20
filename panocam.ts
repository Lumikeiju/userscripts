// ==UserScript==
// @name         Panocam Space Needle Webcam Auto-Refresh
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-refresh Space Needle webcam every 10 minutes on the :x5 minute mark
// @author       Lumikeiju
// @match        https://www.spaceneedle.com/webcam
// @icon         https://www.spaceneedle.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	function scheduleRefresh() {
		const now = new Date();
		const currentMinute = now.getMinutes();
		const currentSecond = now.getSeconds();

		// Calculate minutes until next :x5 mark (05, 15, 25, 35, 45, 55)
		const targetMinutes = [5, 15, 25, 35, 45, 55];
		let nextRefresh = null;

		for (let target of targetMinutes) {
			if (target > currentMinute || (target === currentMinute && currentSecond < 1)) {
				nextRefresh = target;
				break;
			}
		}

		// If no target found in this hour, next one is :05 next hour
		if (nextRefresh === null) {
			nextRefresh = 5;
		}

		const minutesUntilRefresh = (nextRefresh - currentMinute + 60) % 60;
		const secondsUntilRefresh = (60 - currentSecond) % 60;
		const msUntilRefresh = (minutesUntilRefresh * 60 + secondsUntilRefresh) * 1000;

		console.log(`Space Needle webcam will refresh in ${minutesUntilRefresh}m ${secondsUntilRefresh}s at ${nextRefresh} minutes`);

		setTimeout(() => {
			console.log('Refreshing Space Needle webcam...');
			location.reload();
			scheduleRefresh(); // Schedule next refresh
		}, msUntilRefresh);
	}

	// Start the refresh schedule when page loads
	scheduleRefresh();
})();
