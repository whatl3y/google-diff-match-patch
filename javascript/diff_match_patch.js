function diff_match_patch(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32}"object"==typeof module&&module.exports&&(module.exports=diff_match_patch);var DIFF_DELETE=-1,DIFF_INSERT=1,DIFF_EQUAL=0;diff_match_patch.Diff,diff_match_patch.prototype.diff_main=function(t,e,n,i){"undefined"==typeof i&&(i=this.Diff_Timeout<=0?Number.MAX_VALUE:(new Date).getTime()+1e3*this.Diff_Timeout);var h=i;if(null==t||null==e)throw new Error("Null input. (diff_main)");if(t==e)return t?[[DIFF_EQUAL,t]]:[];"undefined"==typeof n&&(n=!0);var r=n,a=this.diff_commonPrefix(t,e),f=t.substring(0,a);t=t.substring(a),e=e.substring(a),a=this.diff_commonSuffix(t,e);var s=t.substring(t.length-a);t=t.substring(0,t.length-a),e=e.substring(0,e.length-a);var l=this.diff_compute_(t,e,r,h);return f&&l.unshift([DIFF_EQUAL,f]),s&&l.push([DIFF_EQUAL,s]),this.diff_cleanupMerge(l),l},diff_match_patch.prototype.diff_compute_=function(t,e,n,i){var h;if(!t)return[[DIFF_INSERT,e]];if(!e)return[[DIFF_DELETE,t]];var r=t.length>e.length?t:e,a=t.length>e.length?e:t,f=r.indexOf(a);if(f!=-1)return h=[[DIFF_INSERT,r.substring(0,f)],[DIFF_EQUAL,a],[DIFF_INSERT,r.substring(f+a.length)]],t.length>e.length&&(h[0][0]=h[2][0]=DIFF_DELETE),h;if(1==a.length)return[[DIFF_DELETE,t],[DIFF_INSERT,e]];var s=this.diff_halfMatch_(t,e);if(s){var l=s[0],_=s[1],c=s[2],g=s[3],o=s[4],p=this.diff_main(l,c,n,i),u=this.diff_main(_,g,n,i);return p.concat([[DIFF_EQUAL,o]],u)}return n&&t.length>100&&e.length>100?this.diff_lineMode_(t,e,i):this.diff_bisect_(t,e,i)},diff_match_patch.prototype.diff_lineMode_=function(t,e,n){var i=this.diff_linesToChars_(t,e);t=i.chars1,e=i.chars2;var h=i.lineArray,r=this.diff_main(t,e,!1,n);this.diff_charsToLines_(r,h),this.diff_cleanupSemantic(r),r.push([DIFF_EQUAL,""]);for(var a=0,f=0,s=0,l="",_="";a<r.length;){switch(r[a][0]){case DIFF_INSERT:s++,_+=r[a][1];break;case DIFF_DELETE:f++,l+=r[a][1];break;case DIFF_EQUAL:if(f>=1&&s>=1){r.splice(a-f-s,f+s),a=a-f-s;for(var i=this.diff_main(l,_,!1,n),c=i.length-1;c>=0;c--)r.splice(a,0,i[c]);a+=i.length}s=0,f=0,l="",_=""}a++}return r.pop(),r},diff_match_patch.prototype.diff_bisect_=function(t,e,n){for(var i=t.length,h=e.length,r=Math.ceil((i+h)/2),a=r,f=2*r,s=new Array(f),l=new Array(f),_=0;_<f;_++)s[_]=-1,l[_]=-1;s[a+1]=0,l[a+1]=0;for(var c=i-h,g=c%2!=0,o=0,p=0,u=0,d=0,F=0;F<r&&!((new Date).getTime()>n);F++){for(var E=-F+o;E<=F-p;E+=2){var m,D=a+E;m=E==-F||E!=F&&s[D-1]<s[D+1]?s[D+1]:s[D-1]+1;for(var I=m-E;m<i&&I<h&&t.charAt(m)==e.charAt(I);)m++,I++;if(s[D]=m,m>i)p+=2;else if(I>h)o+=2;else if(g){var b=a+c-E;if(b>=0&&b<f&&l[b]!=-1){var v=i-l[b];if(m>=v)return this.diff_bisectSplit_(t,e,m,I,n)}}}for(var L=-F+u;L<=F-d;L+=2){var v,b=a+L;v=L==-F||L!=F&&l[b-1]<l[b+1]?l[b+1]:l[b-1]+1;for(var T=v-L;v<i&&T<h&&t.charAt(i-v-1)==e.charAt(h-T-1);)v++,T++;if(l[b]=v,v>i)d+=2;else if(T>h)u+=2;else if(!g){var D=a+c-L;if(D>=0&&D<f&&s[D]!=-1){var m=s[D],I=a+m-D;if(v=i-v,m>=v)return this.diff_bisectSplit_(t,e,m,I,n)}}}}return[[DIFF_DELETE,t],[DIFF_INSERT,e]]},diff_match_patch.prototype.diff_bisectSplit_=function(t,e,n,i,h){var r=t.substring(0,n),a=e.substring(0,i),f=t.substring(n),s=e.substring(i),l=this.diff_main(r,a,!1,h),_=this.diff_main(f,s,!1,h);return l.concat(_)},diff_match_patch.prototype.diff_linesToChars_=function(t,e){function n(t){for(var e="",n=0,r=-1,a=i.length;r<t.length-1;){r=t.indexOf("\n",n),r==-1&&(r=t.length-1);var f=t.substring(n,r+1);n=r+1,(h.hasOwnProperty?h.hasOwnProperty(f):void 0!==h[f])?e+=String.fromCharCode(h[f]):(e+=String.fromCharCode(a),h[f]=a,i[a++]=f)}return e}var i=[],h={};i[0]="";var r=n(t),a=n(e);return{chars1:r,chars2:a,lineArray:i}},diff_match_patch.prototype.diff_charsToLines_=function(t,e){for(var n=0;n<t.length;n++){for(var i=t[n][1],h=[],r=0;r<i.length;r++)h[r]=e[i.charCodeAt(r)];t[n][1]=h.join("")}},diff_match_patch.prototype.diff_commonPrefix=function(t,e){if(!t||!e||t.charAt(0)!=e.charAt(0))return 0;for(var n=0,i=Math.min(t.length,e.length),h=i,r=0;n<h;)t.substring(r,h)==e.substring(r,h)?(n=h,r=n):i=h,h=Math.floor((i-n)/2+n);return h},diff_match_patch.prototype.diff_commonSuffix=function(t,e){if(!t||!e||t.charAt(t.length-1)!=e.charAt(e.length-1))return 0;for(var n=0,i=Math.min(t.length,e.length),h=i,r=0;n<h;)t.substring(t.length-h,t.length-r)==e.substring(e.length-h,e.length-r)?(n=h,r=n):i=h,h=Math.floor((i-n)/2+n);return h},diff_match_patch.prototype.diff_commonOverlap_=function(t,e){var n=t.length,i=e.length;if(0==n||0==i)return 0;n>i?t=t.substring(n-i):n<i&&(e=e.substring(0,n));var h=Math.min(n,i);if(t==e)return h;for(var r=0,a=1;;){var f=t.substring(h-a),s=e.indexOf(f);if(s==-1)return r;a+=s,0!=s&&t.substring(h-a)!=e.substring(0,a)||(r=a,a++)}},diff_match_patch.prototype.diff_halfMatch_=function(t,e){function n(t,e,n){for(var i,h,r,f,s=t.substring(n,n+Math.floor(t.length/4)),l=-1,_="";(l=e.indexOf(s,l+1))!=-1;){var c=a.diff_commonPrefix(t.substring(n),e.substring(l)),g=a.diff_commonSuffix(t.substring(0,n),e.substring(0,l));_.length<g+c&&(_=e.substring(l-g,l)+e.substring(l,l+c),i=t.substring(0,n-g),h=t.substring(n+c),r=e.substring(0,l-g),f=e.substring(l+c))}return 2*_.length>=t.length?[i,h,r,f,_]:null}if(this.Diff_Timeout<=0)return null;var i=t.length>e.length?t:e,h=t.length>e.length?e:t;if(i.length<4||2*h.length<i.length)return null;var r,a=this,f=n(i,h,Math.ceil(i.length/4)),s=n(i,h,Math.ceil(i.length/2));if(!f&&!s)return null;r=s?f&&f[4].length>s[4].length?f:s:f;var l,_,c,g;t.length>e.length?(l=r[0],_=r[1],c=r[2],g=r[3]):(c=r[0],g=r[1],l=r[2],_=r[3]);var o=r[4];return[l,_,c,g,o]},diff_match_patch.prototype.diff_cleanupSemantic=function(t){for(var e=!1,n=[],i=0,h=null,r=0,a=0,f=0,s=0,l=0;r<t.length;)t[r][0]==DIFF_EQUAL?(n[i++]=r,a=s,f=l,s=0,l=0,h=t[r][1]):(t[r][0]==DIFF_INSERT?s+=t[r][1].length:l+=t[r][1].length,h&&h.length<=Math.max(a,f)&&h.length<=Math.max(s,l)&&(t.splice(n[i-1],0,[DIFF_DELETE,h]),t[n[i-1]+1][0]=DIFF_INSERT,i--,i--,r=i>0?n[i-1]:-1,a=0,f=0,s=0,l=0,h=null,e=!0)),r++;for(e&&this.diff_cleanupMerge(t),this.diff_cleanupSemanticLossless(t),r=1;r<t.length;){if(t[r-1][0]==DIFF_DELETE&&t[r][0]==DIFF_INSERT){var _=t[r-1][1],c=t[r][1],g=this.diff_commonOverlap_(_,c),o=this.diff_commonOverlap_(c,_);g>=o?(g>=_.length/2||g>=c.length/2)&&(t.splice(r,0,[DIFF_EQUAL,c.substring(0,g)]),t[r-1][1]=_.substring(0,_.length-g),t[r+1][1]=c.substring(g),r++):(o>=_.length/2||o>=c.length/2)&&(t.splice(r,0,[DIFF_EQUAL,_.substring(0,o)]),t[r-1][0]=DIFF_INSERT,t[r-1][1]=c.substring(0,c.length-o),t[r+1][0]=DIFF_DELETE,t[r+1][1]=_.substring(o),r++),r++}r++}},diff_match_patch.prototype.diff_cleanupSemanticLossless=function(t){function e(t,e){if(!t||!e)return 6;var n=t.charAt(t.length-1),i=e.charAt(0),h=n.match(diff_match_patch.nonAlphaNumericRegex_),r=i.match(diff_match_patch.nonAlphaNumericRegex_),a=h&&n.match(diff_match_patch.whitespaceRegex_),f=r&&i.match(diff_match_patch.whitespaceRegex_),s=a&&n.match(diff_match_patch.linebreakRegex_),l=f&&i.match(diff_match_patch.linebreakRegex_),_=s&&t.match(diff_match_patch.blanklineEndRegex_),c=l&&e.match(diff_match_patch.blanklineStartRegex_);return _||c?5:s||l?4:h&&!a&&f?3:a||f?2:h||r?1:0}for(var n=1;n<t.length-1;){if(t[n-1][0]==DIFF_EQUAL&&t[n+1][0]==DIFF_EQUAL){var i=t[n-1][1],h=t[n][1],r=t[n+1][1],a=this.diff_commonSuffix(i,h);if(a){var f=h.substring(h.length-a);i=i.substring(0,i.length-a),h=f+h.substring(0,h.length-a),r=f+r}for(var s=i,l=h,_=r,c=e(i,h)+e(h,r);h.charAt(0)===r.charAt(0);){i+=h.charAt(0),h=h.substring(1)+r.charAt(0),r=r.substring(1);var g=e(i,h)+e(h,r);g>=c&&(c=g,s=i,l=h,_=r)}t[n-1][1]!=s&&(s?t[n-1][1]=s:(t.splice(n-1,1),n--),t[n][1]=l,_?t[n+1][1]=_:(t.splice(n+1,1),n--))}n++}},diff_match_patch.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,diff_match_patch.whitespaceRegex_=/\s/,diff_match_patch.linebreakRegex_=/[\r\n]/,diff_match_patch.blanklineEndRegex_=/\n\r?\n$/,diff_match_patch.blanklineStartRegex_=/^\r?\n\r?\n/,diff_match_patch.prototype.diff_cleanupEfficiency=function(t){for(var e=!1,n=[],i=0,h=null,r=0,a=!1,f=!1,s=!1,l=!1;r<t.length;)t[r][0]==DIFF_EQUAL?(t[r][1].length<this.Diff_EditCost&&(s||l)?(n[i++]=r,a=s,f=l,h=t[r][1]):(i=0,h=null),s=l=!1):(t[r][0]==DIFF_DELETE?l=!0:s=!0,h&&(a&&f&&s&&l||h.length<this.Diff_EditCost/2&&a+f+s+l==3)&&(t.splice(n[i-1],0,[DIFF_DELETE,h]),t[n[i-1]+1][0]=DIFF_INSERT,i--,h=null,a&&f?(s=l=!0,i=0):(i--,r=i>0?n[i-1]:-1,s=l=!1),e=!0)),r++;e&&this.diff_cleanupMerge(t)},diff_match_patch.prototype.diff_cleanupMerge=function(t){t.push([DIFF_EQUAL,""]);for(var e,n=0,i=0,h=0,r="",a="";n<t.length;)switch(t[n][0]){case DIFF_INSERT:h++,a+=t[n][1],n++;break;case DIFF_DELETE:i++,r+=t[n][1],n++;break;case DIFF_EQUAL:i+h>1?(0!==i&&0!==h&&(e=this.diff_commonPrefix(a,r),0!==e&&(n-i-h>0&&t[n-i-h-1][0]==DIFF_EQUAL?t[n-i-h-1][1]+=a.substring(0,e):(t.splice(0,0,[DIFF_EQUAL,a.substring(0,e)]),n++),a=a.substring(e),r=r.substring(e)),e=this.diff_commonSuffix(a,r),0!==e&&(t[n][1]=a.substring(a.length-e)+t[n][1],a=a.substring(0,a.length-e),r=r.substring(0,r.length-e))),0===i?t.splice(n-h,i+h,[DIFF_INSERT,a]):0===h?t.splice(n-i,i+h,[DIFF_DELETE,r]):t.splice(n-i-h,i+h,[DIFF_DELETE,r],[DIFF_INSERT,a]),n=n-i-h+(i?1:0)+(h?1:0)+1):0!==n&&t[n-1][0]==DIFF_EQUAL?(t[n-1][1]+=t[n][1],t.splice(n,1)):n++,h=0,i=0,r="",a=""}""===t[t.length-1][1]&&t.pop();var f=!1;for(n=1;n<t.length-1;)t[n-1][0]==DIFF_EQUAL&&t[n+1][0]==DIFF_EQUAL&&(t[n][1].substring(t[n][1].length-t[n-1][1].length)==t[n-1][1]?(t[n][1]=t[n-1][1]+t[n][1].substring(0,t[n][1].length-t[n-1][1].length),t[n+1][1]=t[n-1][1]+t[n+1][1],t.splice(n-1,1),f=!0):t[n][1].substring(0,t[n+1][1].length)==t[n+1][1]&&(t[n-1][1]+=t[n+1][1],t[n][1]=t[n][1].substring(t[n+1][1].length)+t[n+1][1],t.splice(n+1,1),f=!0)),n++;f&&this.diff_cleanupMerge(t)},diff_match_patch.prototype.diff_xIndex=function(t,e){var n,i=0,h=0,r=0,a=0;for(n=0;n<t.length&&(t[n][0]!==DIFF_INSERT&&(i+=t[n][1].length),t[n][0]!==DIFF_DELETE&&(h+=t[n][1].length),!(i>e));n++)r=i,a=h;return t.length!=n&&t[n][0]===DIFF_DELETE?a:a+(e-r)},diff_match_patch.prototype.diff_prettyHtml=function(t){for(var e=[],n=/&/g,i=/</g,h=/>/g,r=/\n/g,a=0;a<t.length;a++){var f=t[a][0],s=t[a][1],l=s.replace(n,"&amp;").replace(i,"&lt;").replace(h,"&gt;").replace(r,"&para;<br>");switch(f){case DIFF_INSERT:e[a]='<ins style="background:#e6ffe6;">'+l+"</ins>";break;case DIFF_DELETE:e[a]='<del style="background:#ffe6e6;">'+l+"</del>";break;case DIFF_EQUAL:e[a]="<span>"+l+"</span>"}}return e.join("")},diff_match_patch.prototype.diff_text1=function(t){for(var e=[],n=0;n<t.length;n++)t[n][0]!==DIFF_INSERT&&(e[n]=t[n][1]);return e.join("")},diff_match_patch.prototype.diff_text2=function(t){for(var e=[],n=0;n<t.length;n++)t[n][0]!==DIFF_DELETE&&(e[n]=t[n][1]);return e.join("")},diff_match_patch.prototype.diff_levenshtein=function(t){for(var e=0,n=0,i=0,h=0;h<t.length;h++){var r=t[h][0],a=t[h][1];switch(r){case DIFF_INSERT:n+=a.length;break;case DIFF_DELETE:i+=a.length;break;case DIFF_EQUAL:e+=Math.max(n,i),n=0,i=0}}return e+=Math.max(n,i)},diff_match_patch.prototype.diff_toDelta=function(t){for(var e=[],n=0;n<t.length;n++)switch(t[n][0]){case DIFF_INSERT:e[n]="+"+encodeURI(t[n][1]);break;case DIFF_DELETE:e[n]="-"+t[n][1].length;break;case DIFF_EQUAL:e[n]="="+t[n][1].length}return e.join("\t").replace(/%20/g," ")},diff_match_patch.prototype.diff_fromDelta=function(t,e){for(var n=[],i=0,h=0,r=e.split(/\t/g),a=0;a<r.length;a++){var f=r[a].substring(1);switch(r[a].charAt(0)){case"+":try{n[i++]=[DIFF_INSERT,decodeURI(f)]}catch(s){throw new Error("Illegal escape in diff_fromDelta: "+f)}break;case"-":case"=":var l=parseInt(f,10);if(isNaN(l)||l<0)throw new Error("Invalid number in diff_fromDelta: "+f);var _=t.substring(h,h+=l);"="==r[a].charAt(0)?n[i++]=[DIFF_EQUAL,_]:n[i++]=[DIFF_DELETE,_];break;default:if(r[a])throw new Error("Invalid diff operation in diff_fromDelta: "+r[a])}}if(h!=t.length)throw new Error("Delta length ("+h+") does not equal source text length ("+t.length+").");return n},diff_match_patch.prototype.match_main=function(t,e,n){if(null==t||null==e||null==n)throw new Error("Null input. (match_main)");return n=Math.max(0,Math.min(n,t.length)),t==e?0:t.length?t.substring(n,n+e.length)==e?n:this.match_bitap_(t,e,n):-1},diff_match_patch.prototype.match_bitap_=function(t,e,n){function i(t,i){var h=t/e.length,a=Math.abs(n-i);return r.Match_Distance?h+a/r.Match_Distance:a?1:h}if(e.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var h=this.match_alphabet_(e),r=this,a=this.Match_Threshold,f=t.indexOf(e,n);f!=-1&&(a=Math.min(i(0,f),a),f=t.lastIndexOf(e,n+e.length),f!=-1&&(a=Math.min(i(0,f),a)));var s=1<<e.length-1;f=-1;for(var l,_,c,g=e.length+t.length,o=0;o<e.length;o++){for(l=0,_=g;l<_;)i(o,n+_)<=a?l=_:g=_,_=Math.floor((g-l)/2+l);g=_;var p=Math.max(1,n-_+1),u=Math.min(n+_,t.length)+e.length,d=Array(u+2);d[u+1]=(1<<o)-1;for(var F=u;F>=p;F--){var E=h[t.charAt(F-1)];if(0===o?d[F]=(d[F+1]<<1|1)&E:d[F]=(d[F+1]<<1|1)&E|((c[F+1]|c[F])<<1|1)|c[F+1],d[F]&s){var m=i(o,F-1);if(m<=a){if(a=m,f=F-1,!(f>n))break;p=Math.max(1,2*n-f)}}}if(i(o+1,n)>a)break;c=d}return f},diff_match_patch.prototype.match_alphabet_=function(t){for(var e={},n=0;n<t.length;n++)e[t.charAt(n)]=0;for(var n=0;n<t.length;n++)e[t.charAt(n)]|=1<<t.length-n-1;return e},diff_match_patch.prototype.patch_addContext_=function(t,e){if(0!=e.length){for(var n=e.substring(t.start2,t.start2+t.length1),i=0;e.indexOf(n)!=e.lastIndexOf(n)&&n.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)i+=this.Patch_Margin,n=e.substring(t.start2-i,t.start2+t.length1+i);i+=this.Patch_Margin;var h=e.substring(t.start2-i,t.start2);h&&t.diffs.unshift([DIFF_EQUAL,h]);var r=e.substring(t.start2+t.length1,t.start2+t.length1+i);r&&t.diffs.push([DIFF_EQUAL,r]),t.start1-=h.length,t.start2-=h.length,t.length1+=h.length+r.length,t.length2+=h.length+r.length}},diff_match_patch.prototype.patch_make=function(t,e,n){var i,h;if("string"==typeof t&&"string"==typeof e&&"undefined"==typeof n)i=t,h=this.diff_main(i,e,!0),h.length>2&&(this.diff_cleanupSemantic(h),this.diff_cleanupEfficiency(h));else if(t&&"object"==typeof t&&"undefined"==typeof e&&"undefined"==typeof n)h=t,i=this.diff_text1(h);else if("string"==typeof t&&e&&"object"==typeof e&&"undefined"==typeof n)i=t,h=e;else{if("string"!=typeof t||"string"!=typeof e||!n||"object"!=typeof n)throw new Error("Unknown call format to patch_make.");i=t,h=n}if(0===h.length)return[];for(var r=[],a=new diff_match_patch.patch_obj,f=0,s=0,l=0,_=i,c=i,g=0;g<h.length;g++){var o=h[g][0],p=h[g][1];switch(f||o===DIFF_EQUAL||(a.start1=s,a.start2=l),o){case DIFF_INSERT:a.diffs[f++]=h[g],a.length2+=p.length,c=c.substring(0,l)+p+c.substring(l);break;case DIFF_DELETE:a.length1+=p.length,a.diffs[f++]=h[g],c=c.substring(0,l)+c.substring(l+p.length);break;case DIFF_EQUAL:p.length<=2*this.Patch_Margin&&f&&h.length!=g+1?(a.diffs[f++]=h[g],a.length1+=p.length,a.length2+=p.length):p.length>=2*this.Patch_Margin&&f&&(this.patch_addContext_(a,_),r.push(a),a=new diff_match_patch.patch_obj,f=0,_=c,s=l)}o!==DIFF_INSERT&&(s+=p.length),o!==DIFF_DELETE&&(l+=p.length)}return f&&(this.patch_addContext_(a,_),r.push(a)),r},diff_match_patch.prototype.patch_deepCopy=function(t){for(var e=[],n=0;n<t.length;n++){var i=t[n],h=new diff_match_patch.patch_obj;h.diffs=[];for(var r=0;r<i.diffs.length;r++)h.diffs[r]=i.diffs[r].slice();h.start1=i.start1,h.start2=i.start2,h.length1=i.length1,h.length2=i.length2,e[n]=h}return e},diff_match_patch.prototype.patch_apply=function(t,e){if(0==t.length)return[e,[]];t=this.patch_deepCopy(t);var n=this.patch_addPadding(t);e=n+e+n,this.patch_splitMax(t);for(var i=0,h=[],r=0;r<t.length;r++){var a,f=t[r].start2+i,s=this.diff_text1(t[r].diffs),l=-1;if(s.length>this.Match_MaxBits?(a=this.match_main(e,s.substring(0,this.Match_MaxBits),f),a!=-1&&(l=this.match_main(e,s.substring(s.length-this.Match_MaxBits),f+s.length-this.Match_MaxBits),(l==-1||a>=l)&&(a=-1))):a=this.match_main(e,s,f),a==-1)h[r]=!1,i-=t[r].length2-t[r].length1;else{h[r]=!0,i=a-f;var _;if(_=l==-1?e.substring(a,a+s.length):e.substring(a,l+this.Match_MaxBits),s==_)e=e.substring(0,a)+this.diff_text2(t[r].diffs)+e.substring(a+s.length);else{var c=this.diff_main(s,_,!1);if(s.length>this.Match_MaxBits&&this.diff_levenshtein(c)/s.length>this.Patch_DeleteThreshold)h[r]=!1;else{this.diff_cleanupSemanticLossless(c);for(var g,o=0,p=0;p<t[r].diffs.length;p++){var u=t[r].diffs[p];u[0]!==DIFF_EQUAL&&(g=this.diff_xIndex(c,o)),u[0]===DIFF_INSERT?e=e.substring(0,a+g)+u[1]+e.substring(a+g):u[0]===DIFF_DELETE&&(e=e.substring(0,a+g)+e.substring(a+this.diff_xIndex(c,o+u[1].length))),u[0]!==DIFF_DELETE&&(o+=u[1].length)}}}}}return e=e.substring(n.length,e.length-n.length),[e,h]},diff_match_patch.prototype.patch_addPadding=function(t){for(var e=this.Patch_Margin,n="",i=1;i<=e;i++)n+=String.fromCharCode(i);for(var i=0;i<t.length;i++)t[i].start1+=e,t[i].start2+=e;var h=t[0],r=h.diffs;if(0==r.length||r[0][0]!=DIFF_EQUAL)r.unshift([DIFF_EQUAL,n]),h.start1-=e,h.start2-=e,h.length1+=e,h.length2+=e;else if(e>r[0][1].length){var a=e-r[0][1].length;r[0][1]=n.substring(r[0][1].length)+r[0][1],h.start1-=a,h.start2-=a,h.length1+=a,h.length2+=a}if(h=t[t.length-1],r=h.diffs,0==r.length||r[r.length-1][0]!=DIFF_EQUAL)r.push([DIFF_EQUAL,n]),h.length1+=e,h.length2+=e;else if(e>r[r.length-1][1].length){var a=e-r[r.length-1][1].length;r[r.length-1][1]+=n.substring(0,a),h.length1+=a,h.length2+=a}return n},diff_match_patch.prototype.patch_splitMax=function(t){for(var e=this.Match_MaxBits,n=0;n<t.length;n++)if(!(t[n].length1<=e)){var i=t[n];t.splice(n--,1);for(var h=i.start1,r=i.start2,a="";0!==i.diffs.length;){var f=new diff_match_patch.patch_obj,s=!0;for(f.start1=h-a.length,f.start2=r-a.length,""!==a&&(f.length1=f.length2=a.length,f.diffs.push([DIFF_EQUAL,a]));0!==i.diffs.length&&f.length1<e-this.Patch_Margin;){var l=i.diffs[0][0],_=i.diffs[0][1];l===DIFF_INSERT?(f.length2+=_.length,r+=_.length,f.diffs.push(i.diffs.shift()),s=!1):l===DIFF_DELETE&&1==f.diffs.length&&f.diffs[0][0]==DIFF_EQUAL&&_.length>2*e?(f.length1+=_.length,h+=_.length,s=!1,f.diffs.push([l,_]),i.diffs.shift()):(_=_.substring(0,e-f.length1-this.Patch_Margin),f.length1+=_.length,h+=_.length,l===DIFF_EQUAL?(f.length2+=_.length,r+=_.length):s=!1,f.diffs.push([l,_]),_==i.diffs[0][1]?i.diffs.shift():i.diffs[0][1]=i.diffs[0][1].substring(_.length))}a=this.diff_text2(f.diffs),a=a.substring(a.length-this.Patch_Margin);var c=this.diff_text1(i.diffs).substring(0,this.Patch_Margin);""!==c&&(f.length1+=c.length,f.length2+=c.length,0!==f.diffs.length&&f.diffs[f.diffs.length-1][0]===DIFF_EQUAL?f.diffs[f.diffs.length-1][1]+=c:f.diffs.push([DIFF_EQUAL,c])),s||t.splice(++n,0,f)}}},diff_match_patch.prototype.patch_toText=function(t){for(var e=[],n=0;n<t.length;n++)e[n]=t[n];return e.join("")},diff_match_patch.prototype.patch_fromText=function(t){var e=[];if(!t)return e;for(var n=t.split("\n"),i=0,h=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;i<n.length;){var r=n[i].match(h);if(!r)throw new Error("Invalid patch string: "+n[i]);var a=new diff_match_patch.patch_obj;for(e.push(a),a.start1=parseInt(r[1],10),""===r[2]?(a.start1--,a.length1=1):"0"==r[2]?a.length1=0:(a.start1--,a.length1=parseInt(r[2],10)),a.start2=parseInt(r[3],10),""===r[4]?(a.start2--,a.length2=1):"0"==r[4]?a.length2=0:(a.start2--,a.length2=parseInt(r[4],10)),i++;i<n.length;){var f=n[i].charAt(0);try{var s=decodeURI(n[i].substring(1))}catch(l){throw new Error("Illegal escape in patch_fromText: "+s)}if("-"==f)a.diffs.push([DIFF_DELETE,s]);else if("+"==f)a.diffs.push([DIFF_INSERT,s]);else if(" "==f)a.diffs.push([DIFF_EQUAL,s]);else{if("@"==f)break;if(""!==f)throw new Error('Invalid patch mode "'+f+'" in: '+s)}i++}}return e},diff_match_patch.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},diff_match_patch.patch_obj.prototype.toString=function(){var t,e;t=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1,e=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2;for(var n,i=["@@ -"+t+" +"+e+" @@\n"],h=0;h<this.diffs.length;h++){switch(this.diffs[h][0]){case DIFF_INSERT:n="+";break;case DIFF_DELETE:n="-";break;case DIFF_EQUAL:n=" "}i[h+1]=n+encodeURI(this.diffs[h][1])+"\n"}return i.join("").replace(/%20/g," ")},this.diff_match_patch=diff_match_patch,this.DIFF_DELETE=DIFF_DELETE,this.DIFF_INSERT=DIFF_INSERT,this.DIFF_EQUAL=DIFF_EQUAL;