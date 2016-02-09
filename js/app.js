$(function()
{
	// Do algo
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {

		var htmlSource 	= request.source;
		var profileId		= getProfileId(htmlSource);

		if (profileId > 0) {
			$('.username').html('Successfully!!');
			$('.link').html(writeHtmlTable(profileId));
		} else {
			$('.username').html('Enter to any Facebook profile and then click on FaceSpy icon!');
		}

  }
});

function getProfileId(htmlSourceStr) {
	var targetFlag 	= "profileid=";
	var targetFlag2 =  'type="button"';
	var startPosition = parseInt(htmlSourceStr.indexOf(targetFlag)) + targetFlag.length + 1;

	var returnString = htmlSourceStr.substring(startPosition);

	returnString = returnString.substring(0, returnString.indexOf(targetFlag2) - 2);

	console.log(returnString);

	return returnString;
}

function writeHtmlTable(profileId) {
	var strTable = '<table class=""><tbody><tr> <th>Photos</th> <td> <a id="photos" target="_blank" href="https://www.facebook.com/search/' + profileId +'/photos-of/intersect"> https://www.facebook.com/search/' + profileId + '/photos-of/intersect </a> </td> </tr> <tr> <th>Photos Tagged</th> <td> <a id="photos-tagged" target="_blank" href="https://www.facebook.com/search/' + profileId + '/photos-tagged"> https://www.facebook.com/search/' + profileId + '/photos-tagged </a> </td> </tr> <tr> <th>Photos Liked</th> <td> <a id="photos-liked" target="_blank" href="https://www.facebook.com/search/' + profileId + '/photos-liked"> https://www.facebook.com/search/' + profileId + '/photos-liked </a> </td> </tr> <tr> <th>Photos Commented</th> <td> <a id="photos-commented" target="_blank" href="https://www.facebook.com/search/' + profileId + '/photos-commented"> https://www.facebook.com/search/' + profileId +
	'/photos-commented </a> </td> </tr> </tbody></table>';

	return strTable;
}

function replaceAllStr(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "js/getPageSource.js"
  }, function() {
    if (chrome.runtime.lastError) {
      $('.htmlInput').val('Error injecting script: \n' + chrome.runtime.lastError.message);
    }
  });

}

window.onload = onWindowLoad;
