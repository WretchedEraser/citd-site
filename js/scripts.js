// First, load jQuery (required)
// jQuery 2.2.2 loaded via `index.html`

// Second, load Semantic UI JS (required)
// @codekit-prepend "semantic.js";


// Third, load any plugins (optional)
// @codekit - prepend "plugins.js";


// jQuery Plugins

/*!
 * Lightbox v2.8.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function(a) {
    function b(b) {
        this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b)
    }
    return b.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 500,
        fitImagesInViewport: !0,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1
    }, b.prototype.option = function(b) {
        a.extend(this.options, b)
    }, b.prototype.imageCountLabel = function(a, b) {
        return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
    }, b.prototype.init = function() {
        this.enable(), this.build()
    }, b.prototype.enable = function() {
        var b = this;
        a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(c) {
            return b.start(a(c.currentTarget)), !1
        })
    }, b.prototype.build = function() {
        var b = this;
        a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
            return b.end(), !1
        }), this.$lightbox.hide().on("click", function(c) {
            return "lightbox" === a(c.target).attr("id") && b.end(), !1
        }), this.$outerContainer.on("click", function(c) {
            return "lightbox" === a(c.target).attr("id") && b.end(), !1
        }), this.$lightbox.find(".lb-prev").on("click", function() {
            return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1
        }), this.$lightbox.find(".lb-next").on("click", function() {
            return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1
        }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
            return b.end(), !1
        })
    }, b.prototype.start = function(b) {
        function c(a) {
            d.album.push({
                link: a.attr("href"),
                title: a.attr("data-title") || a.attr("title")
            })
        }
        var d = this,
            e = a(window);
        e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
            visibility: "hidden"
        }), this.sizeOverlay(), this.album = [];
        var f, g = 0,
            h = b.attr("data-lightbox");
        if (h) {
            f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
            for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
        } else if ("lightbox" === b.attr("rel")) c(b);
        else {
            f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
            for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
        }
        var k = e.scrollTop() + this.options.positionFromTop,
            l = e.scrollLeft();
        this.$lightbox.css({
            top: k + "px",
            left: l + "px"
        }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g)
    }, b.prototype.changeImage = function(b) {
        var c = this;
        this.disableKeyboardNav();
        var d = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var e = new Image;
        e.onload = function() {
            var f, g, h, i, j, k, l;
            d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20, i = k - c.containerTopPadding - c.containerBottomPadding - 120, c.options.maxWidth && c.options.maxWidth < j && (j = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (i = c.options.maxHeight), (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
        }, e.src = this.album[b].link, this.currentImageIndex = b
    }, b.prototype.sizeOverlay = function() {
        this.$overlay.width(a(document).width()).height(a(document).height())
    }, b.prototype.sizeContainer = function(a, b) {
        function c() {
            d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.showImage()
        }
        var d = this,
            e = this.$outerContainer.outerWidth(),
            f = this.$outerContainer.outerHeight(),
            g = a + this.containerLeftPadding + this.containerRightPadding,
            h = b + this.containerTopPadding + this.containerBottomPadding;
        e !== g || f !== h ? this.$outerContainer.animate({
            width: g,
            height: h
        }, this.options.resizeDuration, "swing", function() {
            c()
        }) : c()
    }, b.prototype.showImage = function() {
        this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
    }, b.prototype.updateNav = function() {
        var a = !1;
        try {
            document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
        } catch (b) {}
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, b.prototype.updateDetails = function() {
        var b = this;
        if ("undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click", function(b) {
                void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href")
            }), this.album.length > 1 && this.options.showImageNumberLabel) {
            var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(c).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
            return b.sizeOverlay()
        })
    }, b.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
            var a = new Image;
            a.src = this.album[this.currentImageIndex + 1].link
        }
        if (this.currentImageIndex > 0) {
            var b = new Image;
            b.src = this.album[this.currentImageIndex - 1].link
        }
    }, b.prototype.enableKeyboardNav = function() {
        a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
    }, b.prototype.disableKeyboardNav = function() {
        a(document).off(".keyboard")
    }, b.prototype.keyboardAction = function(a) {
        var b = 27,
            c = 37,
            d = 39,
            e = a.keyCode,
            f = String.fromCharCode(e).toLowerCase();
        e === b || f.match(/x|o|c/) ? this.end() : "p" === f || e === c ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === f || e === d) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, b.prototype.end = function() {
        this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
            visibility: "visible"
        }), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling")
    }, new b
});
//# sourceMappingURL=lightbox.min.map


/*!
 * Justified Gallery - v3.6.1
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
! function(a) {
    var b = function(b, c) {
        this.settings = c, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
            entriesBuff: [],
            width: 0,
            height: 0,
            aspectRatio: 0
        }, this.lastAnalyzedIndex = -1, this.yield = {
            every: 2,
            flushed: 0
        }, this.border = c.border >= 0 ? c.border : c.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.spinner = {
            phase: 0,
            timeSlot: 150,
            $el: a('<div class="spinner"><span></span><span></span><span></span></div>'),
            intervalId: null
        }, this.checkWidthIntervalId = null, this.galleryWidth = b.width(), this.$gallery = b
    };
    b.prototype.getSuffix = function(a, b) {
        var c, d;
        for (c = a > b ? a : b, d = 0; d < this.suffixRanges.length; d++)
            if (c <= this.suffixRanges[d]) return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];
        return this.settings.sizeRangeSuffixes[this.suffixRanges[d - 1]]
    }, b.prototype.removeSuffix = function(a, b) {
        return a.substring(0, a.length - b.length)
    }, b.prototype.endsWith = function(a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    }, b.prototype.getUsedSuffix = function(a) {
        for (var b in this.settings.sizeRangeSuffixes)
            if (this.settings.sizeRangeSuffixes.hasOwnProperty(b)) {
                if (0 === this.settings.sizeRangeSuffixes[b].length) continue;
                if (this.endsWith(a, this.settings.sizeRangeSuffixes[b])) return this.settings.sizeRangeSuffixes[b]
            }
        return ""
    }, b.prototype.newSrc = function(a, b, c) {
        var d;
        if (this.settings.thumbnailPath) d = this.settings.thumbnailPath(a, b, c);
        else {
            var e = a.match(this.settings.extension),
                f = null !== e ? e[0] : "";
            d = a.replace(this.settings.extension, ""), d = this.removeSuffix(d, this.getUsedSuffix(d)), d += this.getSuffix(b, c) + f
        }
        return d
    }, b.prototype.showImg = function(a, b) {
        this.settings.cssAnimation ? (a.addClass("entry-visible"), b && b()) : a.stop().fadeTo(this.settings.imagesAnimationDuration, 1, b)
    }, b.prototype.extractImgSrcFromImage = function(a) {
        var b = "undefined" != typeof a.data("safe-src") ? a.data("safe-src") : a.attr("src");
        return a.data("jg.originalSrc", b), b
    }, b.prototype.imgFromEntry = function(a) {
        var b = a.find("> img");
        return 0 === b.length && (b = a.find("> a > img")), 0 === b.length ? null : b
    }, b.prototype.captionFromEntry = function(a) {
        var b = a.find("> .caption");
        return 0 === b.length ? null : b
    }, b.prototype.displayEntry = function(b, c, d, e, f, g) {
        b.width(e), b.height(g), b.css("top", d), b.css("left", c);
        var h = this.imgFromEntry(b);
        if (null !== h) {
            h.css("width", e), h.css("height", f), h.css("margin-left", -e / 2), h.css("margin-top", -f / 2);
            var i = h.attr("src"),
                j = this.newSrc(i, e, f);
            h.one("error", function() {
                h.attr("src", h.data("jg.originalSrc"))
            });
            var k = function() {
                i !== j && h.attr("src", j)
            };
            "skipped" === b.data("jg.loaded") ? this.onImageEvent(i, a.proxy(function() {
                this.showImg(b, k), b.data("jg.loaded", !0)
            }, this)) : this.showImg(b, k)
        } else this.showImg(b);
        this.displayEntryCaption(b)
    }, b.prototype.displayEntryCaption = function(b) {
        var c = this.imgFromEntry(b);
        if (null !== c && this.settings.captions) {
            var d = this.captionFromEntry(b);
            if (null === d) {
                var e = c.attr("alt");
                this.isValidCaption(e) || (e = b.attr("title")), this.isValidCaption(e) && (d = a('<div class="caption">' + e + "</div>"), b.append(d), b.data("jg.createdCaption", !0))
            }
            null !== d && (this.settings.cssAnimation || d.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(b))
        } else this.removeCaptionEventsHandlers(b)
    }, b.prototype.isValidCaption = function(a) {
        return "undefined" != typeof a && a.length > 0
    }, b.prototype.onEntryMouseEnterForCaption = function(b) {
        var c = this.captionFromEntry(a(b.currentTarget));
        this.settings.cssAnimation ? c.addClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
    }, b.prototype.onEntryMouseLeaveForCaption = function(b) {
        var c = this.captionFromEntry(a(b.currentTarget));
        this.settings.cssAnimation ? c.removeClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
    }, b.prototype.addCaptionEventsHandlers = function(b) {
        var c = b.data("jg.captionMouseEvents");
        "undefined" == typeof c && (c = {
            mouseenter: a.proxy(this.onEntryMouseEnterForCaption, this),
            mouseleave: a.proxy(this.onEntryMouseLeaveForCaption, this)
        }, b.on("mouseenter", void 0, void 0, c.mouseenter), b.on("mouseleave", void 0, void 0, c.mouseleave), b.data("jg.captionMouseEvents", c))
    }, b.prototype.removeCaptionEventsHandlers = function(a) {
        var b = a.data("jg.captionMouseEvents");
        "undefined" != typeof b && (a.off("mouseenter", void 0, b.mouseenter), a.off("mouseleave", void 0, b.mouseleave), a.removeData("jg.captionMouseEvents"))
    }, b.prototype.prepareBuildingRow = function(a) {
        var b, c, d, e, f, g = !0,
            h = 0,
            i = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            j = i / this.buildingRow.aspectRatio,
            k = this.buildingRow.width / i > this.settings.justifyThreshold;
        if (a && "hide" === this.settings.lastRow && !k) {
            for (b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], this.settings.cssAnimation ? c.removeClass("entry-visible") : c.stop().fadeTo(0, 0);
            return -1
        }
        for (a && !k && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (g = !1), b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], d = c.data("jg.width") / c.data("jg.height"), g ? (e = b === this.buildingRow.entriesBuff.length - 1 ? i : j * d, f = j) : (e = this.settings.rowHeight * d, f = this.settings.rowHeight), i -= Math.round(e), c.data("jg.jwidth", Math.round(e)), c.data("jg.jheight", Math.ceil(f)), (0 === b || h > f) && (h = f);
        return this.settings.fixedHeight && h > this.settings.rowHeight && (h = this.settings.rowHeight), this.buildingRow.height = h, g
    }, b.prototype.clearBuildingRow = function() {
        this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
    }, b.prototype.flushRow = function(a) {
        var b, c, d, e = this.settings,
            f = this.border;
        if (c = this.prepareBuildingRow(a), a && "hide" === e.lastRow && -1 === this.buildingRow.height) return void this.clearBuildingRow();
        if (this.maxRowHeight.isPercentage ? this.maxRowHeight.value * e.rowHeight < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value * e.rowHeight) : this.maxRowHeight.value > 0 && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value), "center" === e.lastRow || "right" === e.lastRow) {
            var g = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * e.margins;
            for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], g -= b.data("jg.jwidth");
            "center" === e.lastRow ? f += g / 2 : "right" === e.lastRow && (f += g)
        }
        for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], this.displayEntry(b, f, this.offY, b.data("jg.jwidth"), b.data("jg.jheight"), this.buildingRow.height), f += b.data("jg.jwidth") + e.margins;
        this.$gallery.height(this.offY + this.buildingRow.height + this.border + (this.isSpinnerActive() ? this.getSpinnerHeight() : 0)), (!a || this.buildingRow.height <= e.rowHeight && c) && (this.offY += this.buildingRow.height + e.margins, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
    }, b.prototype.checkWidth = function() {
        this.checkWidthIntervalId = setInterval(a.proxy(function() {
            var a = parseFloat(this.$gallery.width());
            Math.abs(a - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = a, this.rewind(), this.startImgAnalyzer(!0))
        }, this), this.settings.refreshTime)
    }, b.prototype.isSpinnerActive = function() {
        return null !== this.spinner.intervalId
    }, b.prototype.getSpinnerHeight = function() {
        return this.spinner.$el.innerHeight()
    }, b.prototype.stopLoadingSpinnerAnimation = function() {
        clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
    }, b.prototype.startLoadingSpinnerAnimation = function() {
        var a = this.spinner,
            b = a.$el.find("span");
        clearInterval(a.intervalId), this.$gallery.append(a.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), a.intervalId = setInterval(function() {
            a.phase < b.length ? b.eq(a.phase).fadeTo(a.timeSlot, 1) : b.eq(a.phase - b.length).fadeTo(a.timeSlot, 0), a.phase = (a.phase + 1) % (2 * b.length)
        }, a.timeSlot)
    }, b.prototype.rewind = function() {
        this.lastAnalyzedIndex = -1, this.offY = this.border, this.clearBuildingRow()
    }, b.prototype.updateEntries = function(b) {
        return this.entries = this.$gallery.find(this.settings.selector).toArray(), 0 === this.entries.length ? !1 : (this.settings.filter ? this.modifyEntries(this.filterArray, b) : this.modifyEntries(this.resetFilters, b), a.isFunction(this.settings.sort) ? this.modifyEntries(this.sortArray, b) : this.settings.randomize && this.modifyEntries(this.shuffleArray, b), !0)
    }, b.prototype.insertToGallery = function(b) {
        var c = this;
        a.each(b, function() {
            a(this).appendTo(c.$gallery)
        })
    }, b.prototype.shuffleArray = function(a) {
        var b, c, d;
        for (b = a.length - 1; b > 0; b--) c = Math.floor(Math.random() * (b + 1)), d = a[b], a[b] = a[c], a[c] = d;
        return this.insertToGallery(a), a
    }, b.prototype.sortArray = function(a) {
        return a.sort(this.settings.sort), this.insertToGallery(a), a
    }, b.prototype.resetFilters = function(b) {
        for (var c = 0; c < b.length; c++) a(b[c]).removeClass("jg-filtered");
        return b
    }, b.prototype.filterArray = function(b) {
        var c = this.settings;
        return "string" === a.type(c.filter) ? b.filter(function(b) {
            var d = a(b);
            return d.is(c.filter) ? (d.removeClass("jg-filtered"), !0) : (d.addClass("jg-filtered"), !1)
        }) : a.isFunction(c.filter) ? b.filter(c.filter) : void 0
    }, b.prototype.modifyEntries = function(a, b) {
        var c = b ? this.entries.splice(this.lastAnalyzedIndex + 1, this.entries.length - this.lastAnalyzedIndex - 1) : this.entries;
        c = a.call(this, c), this.entries = b ? this.entries.concat(c) : c
    }, b.prototype.destroy = function() {
        clearInterval(this.checkWidthIntervalId), a.each(this.entries, a.proxy(function(b, c) {
            var d = a(c);
            d.css("width", ""), d.css("height", ""), d.css("top", ""), d.css("left", ""), d.data("jg.loaded", void 0), d.removeClass("jg-entry");
            var e = this.imgFromEntry(d);
            e.css("width", ""), e.css("height", ""), e.css("margin-left", ""), e.css("margin-top", ""), e.attr("src", e.data("jg.originalSrc")), e.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(d);
            var f = this.captionFromEntry(d);
            d.data("jg.createdCaption") ? (d.data("jg.createdCaption", void 0), null !== f && f.remove()) : null !== f && f.fadeTo(0, 1)
        }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
    }, b.prototype.analyzeImages = function(b) {
        for (var c = this.lastAnalyzedIndex + 1; c < this.entries.length; c++) {
            var d = a(this.entries[c]);
            if (d.data("jg.loaded") === !0 || "skipped" === d.data("jg.loaded")) {
                var e = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                    f = d.data("jg.width") / d.data("jg.height");
                if (e / (this.buildingRow.aspectRatio + f) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(b);
                this.buildingRow.entriesBuff.push(d), this.buildingRow.aspectRatio += f, this.buildingRow.width += f * this.settings.rowHeight, this.lastAnalyzedIndex = c
            } else if ("error" !== d.data("jg.loaded")) return
        }
        this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(b ? "jg.resize" : "jg.complete")
    }, b.prototype.stopImgAnalyzerStarter = function() {
        this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
    }, b.prototype.startImgAnalyzer = function(a) {
        var b = this;
        this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
            b.analyzeImages(a)
        }, .001)
    }, b.prototype.onImageEvent = function(b, c, d) {
        if (c || d) {
            var e = new Image,
                f = a(e);
            c && f.one("load", function() {
                f.off("load error"), c(e)
            }), d && f.one("error", function() {
                f.off("load error"), d(e)
            }), e.src = b
        }
    }, b.prototype.init = function() {
        var b = !1,
            c = !1,
            d = this;
        a.each(this.entries, function(e, f) {
            var g = a(f),
                h = d.imgFromEntry(g);
            if (g.addClass("jg-entry"), g.data("jg.loaded") !== !0 && "skipped" !== g.data("jg.loaded"))
                if (null !== d.settings.rel && g.attr("rel", d.settings.rel), null !== d.settings.target && g.attr("target", d.settings.target), null !== h) {
                    var i = d.extractImgSrcFromImage(h);
                    if (h.attr("src", i), d.settings.waitThumbnailsLoad === !1) {
                        var j = parseFloat(h.attr("width")),
                            k = parseFloat(h.attr("height"));
                        if (!isNaN(j) && !isNaN(k)) return g.data("jg.width", j), g.data("jg.height", k), g.data("jg.loaded", "skipped"), c = !0, d.startImgAnalyzer(!1), !0
                    }
                    g.data("jg.loaded", !1), b = !0, d.isSpinnerActive() || d.startLoadingSpinnerAnimation(), d.onImageEvent(i, function(a) {
                        g.data("jg.width", a.width), g.data("jg.height", a.height), g.data("jg.loaded", !0), d.startImgAnalyzer(!1)
                    }, function() {
                        g.data("jg.loaded", "error"), d.startImgAnalyzer(!1)
                    })
                } else g.data("jg.loaded", !0), g.data("jg.width", g.width() | parseFloat(g.css("width")) | 1), g.data("jg.height", g.height() | parseFloat(g.css("height")) | 1)
        }), b || c || this.startImgAnalyzer(!1), this.checkWidth()
    }, b.prototype.checkOrConvertNumber = function(b, c) {
        if ("string" === a.type(b[c]) && (b[c] = parseFloat(b[c])), "number" !== a.type(b[c])) throw c + " must be a number";
        if (isNaN(b[c])) throw "invalid number for " + c
    }, b.prototype.checkSizeRangesSuffixes = function() {
        if ("object" !== a.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
        var b = [];
        for (var c in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(c) && b.push(c);
        for (var d = {
                0: ""
            }, e = 0; e < b.length; e++)
            if ("string" === a.type(b[e])) try {
                var f = parseInt(b[e].replace(/^[a-z]+/, ""), 10);
                d[f] = this.settings.sizeRangeSuffixes[b[e]]
            } catch (g) {
                throw "sizeRangeSuffixes keys must contains correct numbers (" + g + ")"
            } else d[b[e]] = this.settings.sizeRangeSuffixes[b[e]];
        this.settings.sizeRangeSuffixes = d
    }, b.prototype.retrieveMaxRowHeight = function() {
        var b = {};
        if ("string" === a.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (b.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, b.isPercentage = !1) : (b.value = parseFloat(this.settings.maxRowHeight), b.isPercentage = !0);
        else {
            if ("number" !== a.type(this.settings.maxRowHeight)) throw "maxRowHeight must be a number or a percentage";
            b.value = this.settings.maxRowHeight, b.isPercentage = !1
        }
        if (isNaN(b.value)) throw "invalid number for maxRowHeight";
        return b.isPercentage ? b.value < 100 && (b.value = 100) : b.value > 0 && b.value < this.settings.rowHeight && (b.value = this.settings.rowHeight), b
    }, b.prototype.checkSettings = function() {
        if (this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border"), "justify" !== this.settings.lastRow && "nojustify" !== this.settings.lastRow && "left" !== this.settings.lastRow && "center" !== this.settings.lastRow && "right" !== this.settings.lastRow && "hide" !== this.settings.lastRow) throw 'lastRow must be "justify", "nojustify", "left", "center", "right" or "hide"';
        if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
        if ("boolean" !== a.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
        if ("boolean" !== a.type(this.settings.captions)) throw "captions must be a boolean";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
        if ("boolean" !== a.type(this.settings.fixedHeight)) throw "fixedHeight must be a boolean";
        if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== a.type(this.settings.randomize)) throw "randomize must be a boolean";
        if ("string" !== a.type(this.settings.selector)) throw "selector must be a string";
        if (this.settings.sort !== !1 && !a.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
        if (this.settings.filter !== !1 && !a.isFunction(this.settings.filter) && "string" !== a.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
    }, b.prototype.retrieveSuffixRanges = function() {
        var a = [];
        for (var b in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(b) && a.push(parseInt(b, 10));
        return a.sort(function(a, b) {
            return a > b ? 1 : b > a ? -1 : 0
        }), a
    }, b.prototype.updateSettings = function(b) {
        this.settings = a.extend({}, this.settings, b), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
    }, a.fn.justifiedGallery = function(c) {
        return this.each(function(d, e) {
            var f = a(e);
            f.addClass("justified-gallery");
            var g = f.data("jg.controller");
            if ("undefined" == typeof g) {
                if ("undefined" != typeof c && null !== c && "object" !== a.type(c)) {
                    if ("destroy" === c) return;
                    throw "The argument must be an object"
                }
                g = new b(f, a.extend({}, a.fn.justifiedGallery.defaults, c)), f.data("jg.controller", g)
            } else if ("norewind" === c);
            else {
                if ("destroy" === c) return void g.destroy();
                g.updateSettings(c), g.rewind()
            }
            g.updateEntries("norewind" === c) && g.init()
        })
    }, a.fn.justifiedGallery.defaults = {
        sizeRangeSuffixes: {},
        thumbnailPath: void 0,
        rowHeight: 120,
        maxRowHeight: -1,
        margins: 1,
        border: -1,
        lastRow: "nojustify",
        justifyThreshold: .75,
        fixedHeight: !1,
        waitThumbnailsLoad: !0,
        captions: !0,
        cssAnimation: !1,
        imagesAnimationDuration: 500,
        captionSettings: {
            animationDuration: 500,
            visibleOpacity: .7,
            nonVisibleOpacity: 0
        },
        rel: null,
        target: null,
        extension: /\.[^.\\/]+$/,
        refreshTime: 200,
        refreshSensitivity: 0,
        randomize: !1,
        sort: !1,
        filter: !1,
        selector: "> a, > div:not(.spinner)"
    }
}(jQuery);


// My Scripts

$('#gallery').justifiedGallery({
    rowHeight: 120,
    // lastRow: 'hide',
    margins: 15,
    randomize: true,
    rel: 'gallery'
});
