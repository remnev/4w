'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var Promise = require('bluebird');
var builder = require('xmlbuilder');
var url = require('url');
var hostname = '4window.ru';
var protocol = 'http';

module.exports = function (req, res) {
    Promise.props({
        offers: keystone.list('Product').model
            .find({state: 'published'})
            .select('slug modifiedAt')
            .exec(),
        pageIndex: keystone.list('PageIndex').model
            .findOne()
            .select('modifiedAt')
            .exec(),
        pageContacts: keystone.list('PageContacts').model
            .findOne()
            .select('modifiedAt')
            .exec(),
        pageDelivery: keystone.list('PageDelivery').model
            .findOne()
            .select('modifiedAt')
            .exec(),
        pagePayment: keystone.list('PagePayment').model
            .findOne()
            .select('modifiedAt')
            .exec(),
        pageWarranty: keystone.list('PageWarranty').model
            .findOne()
            .select('modifiedAt')
            .exec()
    })
        .done(function (data) {
            var xml = getXml(data);

            res
                .set('Content-Type', 'text/xml')
                .send(xml);
        });

};

function getXml(data) {
    var urlsTextPages = [
        {
            pathname: '',
            lastmod: data.pageIndex.modifiedAt.toISOString(),
            priority: 0.1
        },
        {
            pathname: 'contacts',
            lastmod: data.pageContacts.modifiedAt.toISOString(),
            priority: 0.2
        },
        {
            pathname: 'delivery',
            lastmod: data.pageDelivery.modifiedAt.toISOString(),
            priority: 0.2
        },
        {
            pathname: 'payment',
            lastmod: data.pagePayment.modifiedAt.toISOString(),
            priority: 0.2
        },
        {
            pathname: 'warranty',
            lastmod: data.pageWarranty.modifiedAt.toISOString(),
            priority: 0.2
        }
    ];
    var urlsProducts = data.offers.map(function (offerData) {
        return {
            pathname: 'products/' + offerData.slug,
            lastmod: offerData.modifiedAt.toISOString(),
            priority: 0.3
        };
    });
    var urlsData = urlsTextPages.concat(urlsProducts);
    var xml = builder
        .create('urlset', {encoding: 'UTF-8'})
            .attribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
            .attribute('xsi:schemaLocation',
                'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')
        .element(urlsData.map(getUrl))
        .end({
            pretty: true,
            indent: '  ',
            newline: '\n'
        });

    return xml;
}

function getUrl(data) {
    return {
        url: {
            loc: url.format({
                protocol: protocol,
                hostname: hostname,
                pathname: data.pathname + '/'
            }),
            lastmod: data.lastmod,
            priority: data.priority
        }
    };
}
