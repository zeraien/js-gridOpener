/**
 * Created by zeraien on 2015-03-19.
 * Requires: fastClick.js https://github.com/dave1010/jquery-fast-click
 *           TweenMax http://greensock.com/tweenmax
 *
 */
$(document).ready(function(){ OpenIt.init(); });

var OpenIt = new _OpenIt();

function _OpenIt(){

    this.isExpanded = false;
    this.targetDivId = "#expandable";
    this.cssClassBox = "box";
    this.cssClassActive = "active";
    this.cssClassInactive = "inactive";
    this.cssClassLoading = "loading";
    this.cssClassClose = "close";
    this.attributeURL = "data-url";
    this.resizeTimer = null;

    this._dots = function ()
    {
        var className = "";
        for (var i = 0; i < arguments.length; i++)
        {
            className += "." + arguments[i];
        }
        return className;
    };

    this.onResize = function ()
    {
        var self = this;
        if (self.isExpanded)
        {
            var html = $(self.targetDivId).find('.wrapper').html();
            self.hideExpandable(false);
            window.setTimeout(function ()
            {
                self.showExpandable(html);
            }, 500);
        }
    };

    this.init = function ()
    {
        var self = this;
        self.initBoxes();
        $(window).resize(function ()
        {
            window.clearTimeout(self.resizeTimer);
            self.resizeTimer = window.setTimeout(function ()
            {
                self.onResize();
            }, 250);
        });
    };

    this.initExpandable = function ()
    {
        var self = this;
        var $expanded = $(self.targetDivId);
        // Close
        $expanded.find(self._dots(self.cssClassClose)).click(function (e)
        {
            e.preventDefault();
            e.stopPropagation();
            TweenMax.fromTo($(this), 0.4, {opacity: 1, rotation: 0}, {opacity: 0, rotation: 90, ease: Expo.easeInOut});
            self.hideExpandable();
        }).removeAttr('style');
    };

    this.initBoxes = function ()
    {
        var self = this;
        $(self._dots(self.cssClassBox)).each(function (index, element)
        {
            var $element = $(element);

            // Click
            $element.fastClick(function (e)
            {
                e.preventDefault();
                e.stopPropagation();
                self.loadExpandable($(this));
            });
        });
        this.getBoxesPerRow();
    };

    this.getBoxesPerRow = function()
    {
        var per_row = 0;
        var offset = 0;
        var list = $(this._dots(this.cssClassBox)).toArray();
        for(var i = 0; i<list.length; i++)
        {
            var element_offset = $(list[i]).offset().top;
            if(offset != element_offset) break;
            per_row++;
        }
        return per_row;
    };

    this.getInsertIndex = function ()
    {
        var self = this;
        var per_row = this.getBoxesPerRow();
        var $speakers = $(self._dots(self.cssClassBox));
        var $active = $(self._dots(self.cssClassBox, self.cssClassActive));
        var index = $speakers.index($active);
        var insert_index = index + (per_row - (index % per_row)) - 1;

        if (insert_index >= $speakers.length - 1)
            insert_index = $speakers.length - 1;
        return insert_index;
    };

    this.hideExpandable = function (remove_inactive)
    {
        if (remove_inactive == undefined) remove_inactive = true;

        var self = this;
        var $expanded = $(self.targetDivId);
        var $section = $expanded.closest('section');
        var $active = $(self._dots(this.cssClassBox, this.cssClassActive));

        // Remove inactive states
        if (remove_inactive)
        {
            $(self._dots(self.cssClassBox, self.cssClassInactive)).removeClass(this.cssClassInactive);
            $active.removeClass(self.cssClassActive);
        }

        // Animate
        $section.addClass('animating');
        TweenMax.to($expanded, 0.4, {
            height: 0, ease: Expo.easeInOut, onComplete: function ()
            {
                $expanded.remove();
                $section.removeClass('animating');
            }
        });
        self.isExpanded = false;
        // Scroll
        if ($active.length) this.scrollTo($active.offset().top - $('header').height(), Expo.easeInOut, 0.4);
    };

    this.scrollToActive = function ($active)
    {
        if ($active == undefined) $active = $(this._dots(this.cssClassBox, this.cssClassActive));
        this.scrollTo($active.offset().top - $('header').height(), Expo.easeInOut, .7);
    };

    this.scrollTo = function (position, ease, speed)
    {
        if (ease == undefined) ease = Sine.easeInOut;
        if (speed == undefined) speed = 1.5;
        var obj = {top: $(window).scrollTop()};
        TweenMax.to(obj, speed, {
            top: position, ease: ease, onUpdate: function ()
            {
                $(window).scrollTop(obj.top);
            }
        });
    };

    this.loadExpandable = function ($target)
    {
        var self = this;
        if ($target.hasClass(this.cssClassActive))
        {
            this.scrollToActive($target);
        }
        else
        {
            $(self._dots(self.cssClassBox)).not($target).addClass(this.cssClassInactive).removeClass(this.cssClassLoading).removeClass(this.cssClassActive);
            $target.removeClass(this.cssClassInactive).addClass(this.cssClassLoading).addClass(this.cssClassActive);

            var $expanded = $(self.targetDivId);
            if ($expanded.height()) this.hideExpandable(false);

            // Ajax - Load content
            var data = {};
            var ajax_url = $target.attr(self.attributeURL);
            $.get(ajax_url, data, function (response)
            {
                // Show content
                setTimeout(function ()
                {
                    self.showExpandable(response);
                }, 1000);
            }, 'html');
        }
    };

    this.showExpandable = function (html)
    {
        var self = this;
        var $active = $(self._dots(self.cssClassBox, self.cssClassActive));
        var $speakers = $(self._dots(self.cssClassBox));
        var insert_index = this.getInsertIndex();

        var $expanded = $(self.targetDivId);
        if (!$expanded.length)
        {
            $expanded = $('#expandable-template').clone();
            $expanded.attr('id', 'expandable');
        }
        $expanded.css('height', '0');
        $expanded.find('.wrapper').html(html);
        $expanded.insertAfter($speakers.eq(insert_index)).data('insert_index', insert_index);

        var new_height = $expanded.addClass('expanded').height();
        $expanded.removeClass('expanded');
        TweenMax.to($expanded, .7, {
            height: new_height, ease: Expo.easeInOut, onComplete: function ()
            {
                $expanded.css('height', 'auto');
            }
        });
        self.scrollToActive($active);

        $active.removeClass(self.cssClassLoading);
        self.isExpanded = true;
        self.initExpandable();
    };
}
